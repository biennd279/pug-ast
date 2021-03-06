FROM node:alpine3
COPY . /app
WORKDIR /app
RUN npm install
RUN
