FROM node:20-alpine
LABEL authors="divaan"

RUN mkdir -p /frontend

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]