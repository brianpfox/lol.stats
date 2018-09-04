# Specify the provider and access details
provider "aws" {
    access_key = "${var.access_key}"
    secret_key = "${var.secret_key}"
    region = "${var.aws_region}"
}

resource "aws_eip" "default" {
  instance = "${aws_instance.lol_stats.id}"
  vpc      = true
}

data "template_file" "script" {
  template = "${file("./ami/userdata.tpl")}"
  
  vars {
    access_key = "${var.access_key}"
    secret_key = "${var.secret_key}"
    region = "${var.aws_region}"
  }
}

data "template_cloudinit_config" "config" {
  gzip          = true
  base64_encode = true

  # Setup userdata script to be called by the cloud-config
  part {
    content_type = "text/x-shellscript"
    content      = "${data.template_file.script.rendered}"
  }
}

resource "aws_instance" "lol_stats" {
  ami      = "${lookup(var.aws_amis, var.aws_region)}"
  instance_type = "${var.instance_type}"
  security_groups = ["${aws_security_group.default.name}"]
  user_data       = "${data.template_cloudinit_config.config.rendered}"
  key_name = "${var.key_name}"

  #Instance tags
  tags {
    Name = "LOL Stats Web Server"
  }
}

# Our default security group to access
# the instances over SSH and HTTP
resource "aws_security_group" "default" {
  name        = "Public Web Server"
  description = "HTTP Access"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["69.140.234.10/32"]
  }

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
