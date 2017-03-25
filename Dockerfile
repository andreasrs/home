FROM node:7.7.4-alpine

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app

RUN npm install

ENV NODE_ENV production
RUN npm run build

CMD ["npm", "start"]
EXPOSE 8080
