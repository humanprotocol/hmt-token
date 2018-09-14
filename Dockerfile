FROM node:alpine
WORKDIR /work
RUN apk update && \
    apk upgrade && \
    apk add git python-dev build-base curl
COPY package*.json /work/
COPY . /work
CMD ["npm", "run", "compile"]
