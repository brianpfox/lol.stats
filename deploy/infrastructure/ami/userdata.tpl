#!/bin/bash -v
echo ${ access_key }

apt-get update -y
apt-get -y install docker.io docker-compose awscli 

usermod -aG docker ubuntu

systemctl enable docker
docker swarm init

su ubuntu -c 'cd ~;
echo "export PATH=~/.local/bin:$PATH" > .bash_profile;
source ~/.bash_profile;
export AWS_ACCESS_KEY_ID=${ access_key }
export AWS_SECRET_ACCESS_KEY=${ secret_key }
export AWS_DEFAULT_REGION=${ region }
'
