# Utilise l'image de base officielle de Node.js
FROM node:slim

# Crée un répertoire pour l'application
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install -g pnpm
RUN pnpm install

# Copie le reste du code
COPY . .

# Expose le port sur lequel l'application va tourner
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["pnpm", "run", "dev"]

