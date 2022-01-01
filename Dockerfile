FROM node:16

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 8080
CMD [ "node", "app.js" ]
