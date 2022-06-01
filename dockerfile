FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install -g nodemon
RUN npm install socket.io
COPY . .

CMD ["npm","start"]