FROM ubuntu:bionic

WORKDIR /work
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y build-essential libffi-dev autoconf libtool \
    python3-dev python3-pip \
    git curl pkg-config && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash -  && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    yarn global add truffle

COPY package.json yarn.lock /work/
RUN yarn

COPY . /work/

CMD ["yarn", "compile"]
