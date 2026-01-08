FROM node:current-alpine

WORKDIR /usr/src/app

ENV PATH=/usr/src/app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm update -g npm
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm approve-builds -g

COPY . .

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["astro", "dev"]
