FROM node:lts-slim

WORKDIR /api

COPY package.json package-lock.json ./

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

COPY . .

RUN npm i -g @nestjs/cli
RUN npm i -g pm2

RUN npm ci --only=production && npm cache clean --force
RUN npm run build

# CMD [ "npm", "run", "start:prod" ]
CMD [ "pm2-runtime", "start", "pm2.json" ]