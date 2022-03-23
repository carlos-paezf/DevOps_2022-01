# Operaciones con Imágenes - Subir un proyecto a un contenedor de NGINX en Docker

> Guía diseñada por: ***Carlos David Páez Ferreira***
>
> Guía liderada por: ***Harvey Nicolás Echavarria Ortiz***
>
> Fecha: ***03 de Marzo de 2022***

## `--format`

### Editar el valor de la variable de entorno de sistema para `--format`

```txt
~$ nano ~/.bashrc
```

![format](doc/01.png)

Al final del archivo añadimos la siguiente línea:

```py
# Environment variable for DOCKER: --format
export DOCKER_FORMAT="ID\t{{.ID}}\nNAME\t{{.Names}}\nPORT\t{{.Ports}}\nSTATUS\t{{.Status}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSIZE\t{{.Size}}\n"
```

![format](doc/02.png)

Presionamos `Ctrl + O` para guardar los cambios, `Enter` para confirmar y `Ctrl + X` para cerrar el editor nano.

![format](doc/03.png)

### Cargar los cambios del archivo `.bashrc`

```txt
~$ source ~/.bashrc
```

![format](doc/04.png)

### Imprimir el valor de la variable `DOCKER_FORMAT`

```txt
~$ echo $DOCKER_FORMAT
```

![format](doc/05.png)

### Imprimir la lista de contenedores activos con la bandera `--format`

```txt
~$ docker ps --format="$DOCKER_FORMAT"
```

![format](doc/06.png)

```txt
~$ docker ps -aq --format="$DOCKER_FORMAT"
```

![format](doc/07.png)

## Operaciones con Imágenes

### Listar todas las imágenes

```txt
~$ docker images
```

![format](doc/08.png)

### Remover una imagen

```txt
~$ docker rmi hello-world
```

![format](doc/09.png)

```txt
~$ docker images
```

![format](doc/10.png)

### Intentar remover una imagen con contenedores activos

```txt
~$ docker rmi mysql
```

![format](doc/11.png)

### Remover una imagen de manera forzada

```txt
~$ docker rmi mysql -f
```

![format](doc/12.png)

```txt
~$ docker images
```

![format](doc/13.png)

### Renovar una imagen por su ID

Podemos remover una imagen por su nombre, como se hizo anteriormente, o eliminarla mediante su ID o las 3 iniciales del mismo. En este caso queremos eliminar la imagen de Ubuntu.

```txt
~$ docker rmi 54c
```

![format](doc/14.png)

```txt
~$ docker images
```

![format](doc/15.png)

### Listar los ID de las imágenes

```txt
~$ docker image -aq
```

![format](doc/16.png)

### Remover todas las imágenes mediante una arreglo

```txt
~$ docker rmi $(docker images -aq)
```

![format](doc/17.png)

Se muestra un error por qué hay contenedores corriendo en el momento.

### Listar contenedores activos

```txt
~$ docker ps
```

![format](doc/18.png)

### Listar todos los contenedores disponibles

```txt
~$ docker ps -a
```

![format](doc/19.png)

### Remover todos los contenedores de manera forzada

```txt
~$ docker rm $(docker ps -aq) -f
```

![format](doc/20.png)

```txt
~$ docker ps -a
```

![format](doc/21.png)

### Eliminar todas la imágenes

```txt
~$ docker rmi $(docker images -aq)
```

![format](doc/22.png)

```txt
~$ docker images
```

![format](doc/23.png)

## Subir un proyecto a un contenedor de NGINX

### Creación de un proyecto

Creamos un directorio en donde guardaremos el código de nuestro proyecto.

![format](doc/24.png)

Dentro de un editor de código, o un IDE, creamos 2 archivos: `index.html` y `about.html`. La estructura del primero será la siguiente:

![format](doc/25.png)

El contenido de `about.html` será el siguiente:

![format](doc/26.png)

### Correr el proyecto en un servidor Web

Necesitamos volver a instalar la imagen de NGINX:

```txt
~$ docker pull nginx
```

![format](doc/27.png)

Para conocer el directorio de nuestro proyecto, podemos correr dentro de la terminar de VSCode el comando:

```txt
~$ pwd
```

![format](doc/28.png)

Luego ponemos a correr un contenedor de la imagen NGINX con el código de nuestro proyecto:

```txt
~$ docker run -d -p 3000:80 --name WebSite -v $(pwd):/usr/share/nginx/html:ro nginx
```

![format](doc/29.png)

Podemos observar los contenedores disponibles con el siguiente comando:

```txt
~$ docker ps -as
```

![format](doc/30.png)

Si vamos al navegador, podemos observar lo siguiente:

![format](doc/31.png)

![format](doc/32.png)

### Realizar cambios al código

En caso de que hagamos cambios a uno de los archivos, solo debemos guardar y se podrá evidenciar el cambio en el navegador sin necesidad de tocar el contenedor.

![format](doc/33.png)

![format](doc/34.png)

### Observar los contenedores activos con la bandera `--format`

```txt
~$ docker ps --format="$DOCKER_FORMAT"
```

![format](doc/35.png)
