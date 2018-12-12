#! /bin/bash

docker-compose -f postgres-compose.yaml down

rm -rf graphql-ts-data

rm -rf graphql-ts-test-data