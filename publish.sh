#!/bin/bash
set -euo pipefail

echo "AWS Authenticate"
LOGIN="aws ecr get-login --no-include-email --region us-east-1"
echo "Get login command for AWS"
echo "${LOGIN}"
LOGINRES=$($LOGIN)
echo "login command"
echo "${LOGINRES}"
LOGINRESX=$($LOGINRES)
echo "login result"
echo "${LOGINRESX}"

echo "Docker Tag and Push"
docker tag bfox/lol_stats_api:latest 844098008956.dkr.ecr.us-east-1.amazonaws.com/bfox/lol_stats_api
docker push 844098008956.dkr.ecr.us-east-1.amazonaws.com/bfox/lol_stats_api
docker tag bfox/match_stats_service:latest 844098008956.dkr.ecr.us-east-1.amazonaws.com/bfox/match_stats_service
docker push 844098008956.dkr.ecr.us-east-1.amazonaws.com/bfox/match_stats_service
