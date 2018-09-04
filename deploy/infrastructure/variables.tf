variable "access_key" {}
variable "secret_key" {}

variable "aws_region" {
  description = "The AWS region to create things in."
  default     = "us-east-1"
}

variable "aws_amis" {
  default = {
    "us-east-1" = "ami-04169656fea786776"
  }
}

variable "availability_zones" {
  default     = "us-east-1a"
  description = "List of availability zones, use AWS CLI to find your "
}

variable "key_name" {
  default = "Fox_AWS"
  description = "Name of AWS key pair"
}

variable "instance_type" {
  default     = "t2.micro"
  description = "AWS instance type"
}
