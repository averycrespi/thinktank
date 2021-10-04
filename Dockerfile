FROM node:14.18
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app
RUN yarn build:client
RUN yarn build:server
EXPOSE 5000
EXPOSE 8000
