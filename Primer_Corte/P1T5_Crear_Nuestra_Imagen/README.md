# Crear una imagen propia y subirla a Docker Hub

## Retomando el proyecto de la sección anterior

### Detener contenedores pasados

Cuando corremos el contenedor con el proyecto, en caso de tener otro contenedor con el mismo contenido, debemos detenerlo y eliminarlo y levantar nuestro proyecto:

```txt
~$ docker rm WebSite -f
```

![vs](doc/02.png)

### Correr un contenedor con nuestro proyecto

Dentro de VSCode, en la terminal ubicada en nuestro proyecto corremos el comando para levantar un contenedor en modo de solo lectura (`:ro`), en segundo plano (`-d`):

```txt
~$ docker run -d -p 3000:80 --name WebSite -v $(pwd):/usr/share/nginx/html:ro nginx
```

![vs](doc/01.png)

### Listar todos los contenedores disponibles con la variable de entorno

```txt
~$ docker ps --format="$DOCKER_FORMAT"
```

![vs](doc/03.png)

### Entrar al contenedor en modo iterativo con `-it`

```txt
~$ docker exec -it WebSite bash
```

![vs](doc/04.png)

### Ingresar a los archivos usando el bash del contenedor

```txt
~$ cd /usr/share/nginx/html
```

```txt
~$ ls -l
```

![vs](doc/05.png)

```txt
~$ exit
```

![vs](doc/06.png)

### Crear un nuevo archivo mediante consola

```txt
~$ touch newFile.html
```

![vs](doc/07.png)

![vs](doc/08.png)

### Evitar el modo lectura

En caso de que se muestre error por estar en modo lectura el contenedor, debemos detener y remover el contenedor, y luego poner a correr un nuevo contenedor evitando la bandera `:ro`. Luego si podemos intentar crear el archivo.

```txt
~$ docker stop WebSite
```

```txt
~$ docker rm WebSite
```

```txt
~$ docker run -d -p 3000:80 --name WebSite -v $(pwd):/usr/share/nginx/html nginx
```

![vs](doc/09.png)

## Configurar nuestra primera imagen

### Crear un README

```txt
~$ touch README.md
```

![vs](doc/10.png)

### Crear un archivo Dockerfile

```txt
~$ touch Dockerfile
```

![vs](doc/11.png)

### Instalar la extensión DOCKER

![vs](doc/12.png)

### Configurar el archivo DOCKERFILE

Debemos tomar una versión determinada de la imagen **NGINX**, luego definimos el directorio donde vamos a trabajar, y por último definimos que todo lo que trabajemos se suba al contenedor.

```dockerfile
FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY . .
```

![vs](doc/13.png)

### Convertir nuestro proyecto en imagen

Es importante que el nombre del archivo que configura Docker, sea `Dockerfile`, con el fin de que no cause problemas al momento de generar la imagen.

![vs](doc/14.png)

Usamos el comando `build` para generar nuestra imagen, pero con un nombre especifico y apuntando al directorio actual `.`

```txt
~$ docker build -t firstimageferrer .
```

![vs](doc/15.png)

Removemos el contenedor de nuestro proyecto que actualmente está corriendo:

```txt
~$ docker rm WebSite -f
```

![vs](doc/16.png)

Confirmar que tenemos nuestra imagen:

```txt
~$ docker images
```

![vs](doc/17.png)

Corremos un nuevo contenedor usando la imagen que acabamos de generar:

```txt
~$ docker run -p 1000:80 -d --name WebSite firstimageferrer
```

![vs](doc/18.png)

```txt
~$ docker ps --format="$DOCKER_FORMAT"
```

![vs](doc/18.png)

Confirmar en un navegador que nuestro contenedor esté funcionando:

![vs](doc/20.png)

## Subir la imagen a DockerHub

### Iniciar sesión mediante la consola

```txt
~$ docker login
```

![vs](doc/21.png)

### Construimos una imagen como repositorio

```txt
~$ docker build -t carlospaezf/firstimageferrer .
```

![vs](doc/25.png)

### Subir la imagen mediante comando

```txt
~$ docker push carlospaezf/firstimageferrer
```

![vs](doc/22.png)

Verificar que se haya subido la imagen a nuestra cuenta de DockerHub:

![vs](doc/23.png)

![vs](doc/24.png)
