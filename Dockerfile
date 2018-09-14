FROM node:alpine
WORKDIR /work
RUN apk update && \
    apk upgrade && \
    apk add git python-dev build-base curl
RUN npm install -g truffle
COPY ./package*.json /work/
RUN npm install
COPY . /work/
