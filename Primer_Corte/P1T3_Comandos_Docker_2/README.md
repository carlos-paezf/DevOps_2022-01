# Más comandos de Docker

> Guía diseñada por: ***Carlos David Páez Ferreira***
> Guía liderada por: ***Harvey Nicolás Echavarria Ortiz***
> Fecha: 01 Marzo 2022

## Correr contenedores en segundo plano de HTTPD

```txt
~$ docker run -p 1000:80 -p 2000:80 -p 3000:00 -d httpd
```

![Run containers](doc/01.png)

## Listar los contenedores activos

```txt
~$ docker ps
```

![ps](doc/02.png)

## Descargar la imagen de MySQL

```txt
~$ docker pull mysql
```

![mysql](doc/03.png)

## Correr un contenedor con MySQL con un nombre especifico

```txt
~$ docker run -d -p 3306:3306 --name mydatabase mysql
```

![mysql](doc/04.png)

```txt
~$ docker ps -a
```

![mysql](doc/05.png)

## Eliminar todos los contenedores

```txt
~$ docker rm $(docker ps -aq)
```

![mysql](doc/06.png)

## Forzar la detención de un contenedor

```txt
~$ docker rm $(docker ps -aq) -f
```

![mysql](doc/07.png)

```txt
~$ docker ps -a
```

![mysql](doc/08.png)

## Añadir variables de entorno

```txt
~$ docker run -d -p 3307:3307 --name mydatabase -e MYSQL_ROOT_PASSWORD=password mysql
```

![mysql](doc/09.png)

```txt
~$ docker ps -aq
```

![mysql](doc/10.png)

```txt
~$ docker ps -a
```

![mysql](doc/11.png)

## Levantar un servidor de NGINX

```txt
~$ docker run -p 1000:80 -d --name server-nginx nginx
```

![nginx](doc/12.png)

```txt
~$ docker ps -a
```

![nginx](doc/13.png)

![nginx](doc/14.png)

## Remover el contenedor de NGINX por el nombre

```txt
~$ docker stop server-nginx
```

```txt
~$ docker rm server-nginx
```

![nginx](doc/15.png)

![nginx](doc/16.png)

## Listar los contenedores con propiedades especificas

```txt
~$ docker ps -aq --format="ID\t{{.ID}}"
```

![nginx](doc/17.png)

```txt
~$ docker ps -aq --format="Nombres\t{{.Names}}"
```

![nginx](doc/18.png)

```txt
~$ docker ps -aq --format="ID\t{{.ID}}\nNombres\t{{.Names}}"
```

![nginx](doc/19.png)
