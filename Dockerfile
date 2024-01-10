FROM node:lts-slim

WORKDIR /api

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

COPY . .

RUN npm ci

CMD [ "npm", "run", "start:prod" ]
