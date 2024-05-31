FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

EXPOSE ${NUXT_PORT}
CMD ["npm", "run", "dev"]
