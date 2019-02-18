#! /bin/bash
set -e

docker-compose run node node generate
aws s3 sync "schemas/" "s3://aston.docs/schemas/"
