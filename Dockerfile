FROM node:16.14.0 AS builder

WORKDIR /usr/src/app
EXPOSE 3000

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
