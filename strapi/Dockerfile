FROM --platform=linux/amd64 node:20-alpine

RUN apk update && apk add --no-cache jq
WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

EXPOSE ${STRAPI_PORT}
CMD npm run strapi-import && npm run develop
