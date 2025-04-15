# Étape 1 : Utiliser l'image officielle de Node.js comme base
FROM node:16

# Étape 2 : Créer un répertoire pour l'application et définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier package.json et package-lock.json pour installer les dépendances
COPY backend/package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tous les fichiers du répertoire actuel (backend) dans le conteneur
COPY . /app

# Étape 6 : Exposer le port sur lequel l'app écoutera
EXPOSE 3000

# Étape 7 : Lancer le serveur Node.js
CMD ["node", "server.js"]
