FROM node:12-alpine

WORKDIR /work
RUN apk update && \
    apk upgrade && \
    apk add git python-dev build-base curl && \
    npm install -g yarn && \
    yarn global add truffle

COPY package.json yarn.lock /work/
RUN yarn

COPY . /work/

CMD ["yarn", "compile"]
