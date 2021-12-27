FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

## put the pacakge.json into the dir, for installing dependency
COPY package.json .
COPY package-lock.json .

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm install git+https://git@github.com/dignifiedquire/webcrypto-shim.git


## copy all file into the WORKDIR
COPY . .

EXPOSE ${SERVER_PORT}
CMD ["npm","start"]