# Usa una imagen base de Node.js
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Copia el archivo .env al contenedor
COPY .env ./

# Expon el puerto que usa la aplicación
EXPOSE 4200

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
