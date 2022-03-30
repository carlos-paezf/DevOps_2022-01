#  Cuando se crea el contenedor se instala NodeJS
FROM node:14

#  Crear una carpeta donde va el código.
#  Ejeuctar comandos de Linux (Docker es un contenedor con comando de Linux)
#  La rutaestá dada por la documentación de Node
RUN mkdir -p /usr/src/app

#  Directorio actual
WORKDIR /usr/src/app


#  Una vez en la carpeta se debe copiar el archivo package.json y package-lock.json para instalar dependencias dentro del contendor
COPY package*.json ./

RUN npm install

#  Directorio actual dentro del contenedor actual
COPY . .

#  Especificar el puerto dentro del contenedor, en este caso enlazarlo con el puento definido en la maquina
EXPOSE 3000

#  Iniciar Comandos
CMD [ "npm", "start", "dev" ]