FROM node:18-alpine

WORKDIR /crs_dbms

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]