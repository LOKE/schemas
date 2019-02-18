#! /bin/bash
set -e

node generate.js
aws s3 sync "schemas/" "s3://aston.docs/schemas/"
