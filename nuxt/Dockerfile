FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE ${NUXT_PORT}
CMD ["npm", "run", "dev"]
