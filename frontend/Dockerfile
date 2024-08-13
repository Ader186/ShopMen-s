# Usa una imagen base de Node.js
FROM node:18 AS build-stage

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto y instala dependencias
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación construida
FROM nginx:alpine

# Copia la aplicación construida a la imagen de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expon el puerto que usa Nginx
EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
