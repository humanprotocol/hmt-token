FROM node:alpine
WORKDIR /work
RUN apk update && \
    apk upgrade && \
    apk add git python-dev build-base curl
COPY . /work/
RUN npm install -g truffle
RUN ["npm", "install"]
