# Subir una WebSite más compleja como imagen a DockerHub

## Crear un proyecto

Creamos un nuevo proyecto en el que tendremos algún archivos de html y de css. También podemos implementar Bootstrap dentro de nuestra página web.

## Correr nuestro proyecto en un contenedor de NGINX

```txt
~$ docker run d -p 3000:80 --name WebSiteDockerHub -v $(pwd):/usr/share/nginx/html:ro nginx
```

![v](doc/01.png)

## Listar los contenedores con formato

```txt
~$ docker ps --format="$DOCKER_FORMAT"
```

![v](doc/02.png)

## Ver el proyecto en el navegador

![v](doc/03.png)

## Iniciar sesión de Docker desde la consola

```txt
~$ docker login
```

![v](doc/04.png)

## Construir la imagen con el proyecto

```txt
~$ docker build -t carlospaezf/websitedockerhub .
```

![v](doc/05.png)

## Subir la imagen a nuestro repositorio de Docker Hub

```txt
~$ docker push carlospaezf/websitedockerhub
```

![v](doc/07.png)

## Observar la imagen en nuestra cuenta

![v](doc/08.png)

## Remover todos los contenedores

```txt
~$ docker rm $(docker ps -aq) -f
```

![v](doc/09.png)

![v](doc/10.png)

## Descargar la imagen de nuestro repositorio

```txt
~$ docker pull carlospaezf/websitedockerhub
```

![v](doc/11.png)

## Listar todas las imágenes en el equipo

```txt
~$ docker images -a
```

![v](doc/12.png)

## Correr un contenedor con nuestra imagen descargada

```txt
~$ docker run -d -p 2000:80 ---name WebSiteDescargada carlospaezf/websitedockerhub
```

![v](doc/13.png)

## Listar nuestros contenedores

```txt
~$ docker ps --format="$DOCKER_FORMAT"
```

![v](doc/14.png)

## Observar nuestro contenedor corriendo

![v](doc/15.png)
