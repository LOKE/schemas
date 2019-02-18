#! /bin/bash
set -e

pwd
ls -l
docker-compose run node node generate
aws s3 sync "schemas/" "s3://aston.docs/schemas/"
