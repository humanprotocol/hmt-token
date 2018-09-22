FROM node:alpine

WORKDIR /work
RUN apk update && \
    apk upgrade && \
    apk add git python-dev build-base curl && \
    npm install -g yarn && \
    yarn global add truffle

COPY package.json /work/
COPY yarn.lock /work/
RUN yarn

COPY . /work/

CMD ["npm", "run", "compile"]
