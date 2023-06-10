FROM node:20

WORKDIR /app

COPY package*.json ./


RUN npm install -g vite

CMD [ "npm", "install" ]

COPY . .

CMD [ "vite", "build" ]