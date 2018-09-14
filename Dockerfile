FROM node:alpine
WORKDIR /work
RUN apk update && \
    apk upgrade && \
    apk add git python-dev build-base curl yarn
COPY package*.json yarn.lock /work/
RUN yarn install && yarn global add truffle
COPY . /work
CMD ["npm", "run", "compile"]
