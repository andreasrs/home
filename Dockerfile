FROM node:10.13.0-alpine

RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app
RUN npm install

COPY . /src/app
ENV NODE_ENV production
RUN npm run build

CMD ["npm", "start"]
EXPOSE 8080
