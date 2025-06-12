FROM node:slim

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["astro", "dev"]
