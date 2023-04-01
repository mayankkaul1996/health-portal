FROM node:14.17.4-alpine

RUN apk add --no-cache bash
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# TODO: add other args and envs
# Get build param
ARG NODE_ENV

# Set env var
ENV NODE_ENV=$NODE_ENV
ARG PROJECT_ID
ENV PROJECT_ID=$PROJECT_ID

# Copy local code to the container image.
COPY package.json ./

COPY . ./

RUN yarn

# Test an app before build
RUN yarn test

# Typescript application build
RUN yarn build

# Run the web service on container startup.
CMD [ "node", "dist/main.js" ]