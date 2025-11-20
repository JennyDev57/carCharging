# Utilise l'image de base officielle de Node.js
FROM node:current-alpine

# Crée un répertoire pour l'application
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Copie le reste du code
COPY . .

# Installe les dépendances
RUN npm update -g npm
RUN npm install -g pnpm
RUN pnpm install

# Expose le port sur lequel l'application va tourner
# ENV HOST=0.0.0.0
# ENV PORT=5000
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["pnpm", "run", "dev"]

