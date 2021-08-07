FROM node:12-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -g nodemon@1.19.1
RUN npm install --quiet
COPY . .

EXPOSE 3000
EXPOSE 9229

CMD [ "npm", "start" ]