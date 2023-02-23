FROM node:14.17.4-alpine

RUN apk add --no-cache bash
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]