FROM node:24-slim

WORKDIR /app

COPY . .

RUN yarn install && yarn build

CMD ["node", "dist/main.js"]
