FROM node:18.2-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY .env ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]