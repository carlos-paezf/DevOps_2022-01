# Node y MongoDB

> Guía elaborada por: ***Carlos David Páez Ferreira***
>
> Guía Liderada por: ***Harvey Nicolás Echavarria Ortiz***
>
> Fecha: ***29 Marzo 2022***

## Crear un nuevo directorio para el proyecto

![i](doc/01.png)

## Inicializar el proyecto de Node

![i](doc/02.png)

![i](doc/03.png)

## Configurar los scripts del proyecto

Dentro del archivo `package.json` configuramos un comando para levantar el proyecto.

```json
{
    ...,
    "scripts": {
        ...,
        "start": "node src/index.js"
    },
}
```

## Instalar los módulos necesarios

```txt
npm i express mongoose
```

![i](doc/04.png)

![i](doc/05.png)

## Creación del archivo `index.js`

Dentro de la carpeta `src` creamos un archivo llamado `index.js`, el cual será el centro de nuestro proyecto.

![i](doc/06.png)

## Creación del archivo `database.js`

Dentro de la carpeta `db` creamos un archivo llamado `database.config.js`, en el cual configuramos la conexión con la base de datos.

![i](doc/07.png)

## `index.js`

El archivo `index.js` tendrá el siguiente contenido:

![i](doc/08.png)

## Correr el proyecto

Usamos el script que configuramos para levantar el proyecto

```txt
npm run start
```

![i](doc/09.png)

Si accedemos desde el navegador, no vamos a encontrar nada puesto que no hemos configurado rutas en nuestra aplicación.

![u](doc/10.png)

## Creación del archivo `Dockerfile`

Creamos un archivo llamado `Dockerfile`:

![i](doc/11.png)

El contenido dentro del mismo será lo siguiente:

![i](doc/12.png)

## `.dockerignore`

Creamos un archivo llamado `.dockerignore` para poder ignorar los archivos o directorios que no deben ir dentro del contenedor.

![i](doc/13.png)

El contenido del archivo será lo siguiente:

```txt
node_modules
```

## Modificación al archivo `Dockerfile`

Vamos a añadir unas cuantas líneas al archivo `Dockerfile`:

![i](doc/14.png)

## Descargar la imagen de Node y ejecutar los comandos uno a uno

```txt
docker build -t hellonode .
```

![i](doc/15.png)

## Listar las imágenes actuales

```txt
docker images
```

![i](doc/16.png)

## Correr la imagen de `hellonode`

```txt
docker run -p 4000:3000 hellonode
```

El puerto 4000 es por donde escucha nuestra maquina, y el puerto 3000 es el puerto configurado para nuestro servidor.

![i](doc/17.png)

Ahora validamos en el navegador:

![i](doc/18.png)

Por el momento, cancelamos el proceso con `Ctrl + C` en la terminal.

## `docker-compose.yml`

Necesitamos un archivo que nos permita componer distintas imágenes, para ello creamos el archivo `docker-compose.yml` en la raíz del proyecto

![i](doc/19.png)

El contenido de dicho archivo será el siguiente:

![i](doc/20.png)

## Configurar la conexión con la base de datos

Dentro del archivo `database.config.js` tenemos la siguiente configuración:

![i](doc/21.png)

## Docker-Compose

Ejecutamos el siguiente comando:

```txt
docker-compose build
```

![i](doc/22.png)

Cuando ejecutamos el comando para listar imágenes de Docker, podemos observar que tenemos una nueva imagen llamada `p2t1_node_mongo_web`:

```txt
docker images
```

![i](doc/23.png)

Para probar nuestra imagen podemos usar el siguiente comando:

```txt
docker-compose up
```

![i](doc/24.png)
![i](doc/25.png)

Para poder ver la cadena de conexión a nuestra base de datos debemos añadir una línea al constructor de nuestro servidor, en la cual requerimos la configuración de la base de datos:

![i](doc/26.png)

Debemos detener el contenedor, volverlo a construir y volverlo a lanzar:

```txt
docker-compose build
```

![i](doc/27.png)

```txt
docker-compose up
```

![i](doc/28.png)

![i](doc/29.png)

## Archivos de rutas en la aplicación

Primero detenemos el proceso en consola con el comando `Ctrl + C`. Luego, creamos un directorio llamado `src/routes`, y dentro del mismo creamos un archivo llamado `index.routes.js`

![i](doc/30.png)

Luego dentro del archivo `docker-compose.yml` añadimos el término `volumes`, el cual permite copiar en ambas direcciones (del proyecto al contenedor y del contenedor al proyecto), y lo modificamos de la siguiente manera:

![i](doc/31.png)

Volvemos a construir el proyecto y a levantar el contenedor

```txt
docker-compose build
```

![i](doc/32.png)

```txt
docker-compose up
```

![i](doc/33.png)

Para comprobar que funciona la propiedad `volumes`, creamos un archivo llamado `.gitignore` en la raíz del proyecto.

![i](doc/34.png)

Luego, ejecutamos en terminal el comando para observar los contenedores activos:

```txt
docker ps
```

![i](doc/35.png)

Posteriormente, ejecutamos el contenedor `exampleapp` en modo interactivo con un bash, y dentro listamos todos los archivos que contiene:

```txt
docker exec -it exampleapp bash
```

```txt
~$ ls -a
```

![i](doc/36.png)

Como se puede observar, creamos el archivo `.gitignore` desde el proyecto, pero a su vez se creo en el contenedor.

## Nodemon

En una nueva consola del proyecto, instalamos el módulo Nodemon en modo desarrollo con el siguiente comando, esto lo hacemos con el fin de recargar el servidor más fácil ante los cambios:

```txt
npm i nodemon -D
```

![i](doc/37.png)

Luego, dentro de `package.json`, añadimos un nuevo script para iniciar con nodemon:

```json
{
    ...,
    "scripts": {
        ...,
        "dev": "nodemon src/index.js"
    },
}
```

Dentro del archivo `Dockerfile` hacemos un cambio para que inicie con Nodemon:

```dockerfile
CMD [ "npm", "start", "dev" ]
```

Volvemos a detener el proceso del contenedor, hacemos de nuevo un build y lo volvemos a levantar:

```txt
docker-compose build
```

![i](doc/38.png)

```txt
docker-compose up
```

![i](doc/39.png)

## Rutas

Dentro del archivo `index.routes.js` añadimos una ruta que se accede con el verbo GET:

![i](doc/40.png)

Dentro del archivo `index.js` hacemos los siguientes cambios.

![i](doc/41.png)

De nuevo, hacemos un build del proyecto y levantamos el contenedor:

```txt
docker-compose build
```

![i](doc/42.png)

```txt
docker-compose up
```

![i](doc/43.png)

Podemos ir al navegador y hacer una prueba a nuestro endpoint `http://localhost:5000` (el puerto 5000, es el puerto que se definió dentro del archivo `docker-compose.yml`):

![i](doc/44.png)
