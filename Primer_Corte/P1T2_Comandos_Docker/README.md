# Repaso Comandos Docker

> Guía elaborada por: ***Carlos David Páez Ferreira***
>
> Guía Liderada por: ***Harvey Nicolás Echavarria Ortiz***
>
> Fecha: ***24 Febrero 2022***

## Listar las imágenes

```txt
~$ sudo docker images
```

![Docker Images](doc/01.png)

## Observar todos los contenedores

```txt
~$ sudo docker ps -a
```

![Docker Containers](doc/02.png)

## Poner a correr un contenedor

### ... Por el nombre

```txt
~$ sudo docker start <name>
```

![Docker start name](doc/03.png)

### ... Por el id

```txt
~$ sudo docker start <id>
```

![Docker start id](doc/04.png)

### ... Por las 3 iniciales del id

```txt
~$ sudo docker start <3 iniciales del id>
```

![Docker start 3 iniciales id](doc/05.png)

## Observar los contenedores corriendo

```txt
~$ sudo docker ps
```

![Docker Containers Run](doc/06.png)

## Detener un contenedor

```txt
~$ sudo docker stop <name, id, o 3 iniciales del id>
```

![Docker Containers stop](doc/07.png)

## NGINX

### Instalar la imagen de Nginx

```txt
~$ sudo docker pull nginx
```

![Nginx image](doc/08.png)

```txt
~$ sudo docker images
```

![Nginx image](doc/09.png)

### Correr un contenedor de Nginx con n puerto

```txt
~$ sudo docker run -p <puerto de lanzamiento al navegador>:<puerto por donde se escucha> nginx
```

![Nginx image run](doc/10.png)

En una nueva pestaña observamos los contenedores activos.

```txt
~$ sudo docker ps
```

![Nginx run](doc/11.png)

### Correr un contenedor Nginx en segundo plano

Para no usar otra pestaña de la terminal, usamos la bandera `-d`

```txt
~$ sudo docker run -p <puerto de lanzamiento al navegador>:<puerto por donde se escucha> -d nginx
```

![Nginx image run](doc/12.png)

Podemos observar que el contenedor está corriendo, cuando dentro del navegador ingresamos la dirección `localhost:3000` o el puerto con el que se configuro el contenedor con la imagen:

![Nginx browser](doc/13.png)

### Detener el contenedor de Nginx

```txt
~$ sudo docker stop <name, id, o 3 iniciales del id>
```

![Nginx stop](doc/14.png)

Si volvemos al navegador, podemos observar que ya no está disponible el contenedor:

![Nginx stop browser](doc/15.png)

### Ejecutar el contenedor en diversos puertos a la vez

Podemos ejecutar varios contenedores de la misma imagen, a la vez, pero en diversos puertos:

```txt
~$ sudo docker run -p 1000:80 -d nginx
```

```txt
~$ sudo docker run -p 2000:80 -d nginx
```

```txt
~$ sudo docker run -p 3000:80 -d nginx
```

![containers browser](doc/20.png)

### Listar los contenedores por ID

```txt
~$ sudo docker ps -aq
```

![Docker contenedores](doc/16.png)

### Remover los contenedores por el ID

```txt
~$ sudo docker rm <id, o 3 iniciales del id>
```

![Docker contenedores](doc/17.png)

### Remover todos los contenedores

Podemos pasar un arreglo con los id de todos los contenedores, y con ello lo podemos remover a la vez.

```txt
~$ sudo docker rm $(docker ps -aq)
```

![Remover containers](doc/18.png)

### Comando para correr varios contenedores de la misma imagen pero en varios puertos

```txt
~$ sudo docker run -p 1000:80 -p 2000:80 -p 5000:80 nginx
```

![containers múltiples](doc/19.png)

![containers browser](doc/20.png)

### Detener los contenedores

```txt
~$ sudo docker stop <3 iniciales del id>
```

![containers stop](doc/21.png)

![containers browser stop](doc/22.png)

## HTTPD

### Instalar la imagen de HTTPD

```txt
~$ sudo docker pull httpd
```

![containers stop](doc/23.png)

### Verificar si se encuentra la imagen

```txt
~$ sudo docker images
```

![images](doc/24.png)

### Correr en varios puertos

```txt
~$ sudo docker run -p 1000:80 -p 2000:80 -p 5000:80 httpd
```

![containers múltiples](doc/25.png)

![containers browser](doc/26.png)

### Detener los contenedores de httpd

```txt
~$ sudo docker stop a7b
```

![containers múltiples](doc/27.png)

![containers stop](doc/28.png)
