#!/bin/bash
set -e

if [ "$NODE_ENV" == "" ]; then
    echo "Error: you need to provide an environment using NODE_ENV"
    exit 1
fi

# run migration
yarn run migration:up

# start the app
if [[ "$NODE_ENV" == "production" ]]; then
    yarn start:prod
else
    yarn start
fi
