FROM node:20.2

ENV NODE_ENV=production

# install backend deps
WORKDIR /backend

COPY backend/package*.json ./

RUN npm install --production

COPY backend/. .

# compile frontend
WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install -g vite

RUN npm install

COPY frontend/. .

RUN vite build

WORKDIR /backend

# run backend
CMD ["node", "server.js"]