FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE ${STRAPI_PORT}
CMD ["npm", "run", "develop"]
