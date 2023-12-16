# Utilisez l'image Node.js pour construire l'application frontend
FROM node:18 as build

# Définissez le répertoire de travail dans lequel l'application frontend sera construite
WORKDIR /app

# Copiez le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application frontend
COPY . .

# Construisez l'application frontend
RUN npm run build

# Utilisez une image légère pour exécuter l'application frontend
FROM nginx:alpine

# Copiez les fichiers construits depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Exposez le port 9000 (peut être omis si cela ne vous est pas nécessaire)
EXPOSE 9000

# Commande pour démarrer le serveur nginx
CMD ["nginx", "-g", "daemon off;"]
