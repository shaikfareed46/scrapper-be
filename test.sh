#!/usr/bin/env bash
docker build . -t saal-service-test:latest -f dev.Dockerfile

docker run                  \
    --rm                    \
    --name=inventory-syncer-test  \
    --env "PORT=8099" \
    --env "SQL_DB_USERNAME=sa" \
    --env "SQL_DB_PASSWORD=Password123" \
    --env "SQL_DB_PORT=1433" \
    --env "SQL_DB_HOST=sqldb" \
    --env "SQL_DB_NAME=''" \
    --env "INVENTORY_URI='http://stub'" \
    --env "REDIS_PORT=6379" \
    --env "REDIS_HOST=syncer-redis" \
    -v "${PWD}":/user \
    -w "/user"  \
    saal-service-test:latest  \
    yarn run test
