FROM node:20-alpine
LABEL authors="divaan"

RUN mkdir -p /backend

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

COPY .env .env

RUN npm run build

ENTRYPOINT ["npm", "run", "start:prod"]