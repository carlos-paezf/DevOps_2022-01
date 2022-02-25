# Instalación de Docker

## Actualización de paquetes

```txt
~$ sudo apt-get update
```

![Update](doc/01.png)

## Instalar paquetes necesarios para Docker

```txt
~$ sudo apt-get install ca-certificates curl gnupg lsb-release 
```

![Install](doc/02.png)

```txt
~$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg  | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

```txt
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```txt
~$ sudo apt-get update
```

![Update](doc/03.png)

```txt
~$ sudo  apt-get  install  docker-ce  docker-ce-cli  containerd.io
```

![Docker](doc/04.png)

## Versión de Docker

```txt
~$ sudo docker version
```

![Versión](doc/05.png)

## Añadir un groupadd para Docker y activar el modo de usuario

```txt
~$ sudo groupadd docker 
```

```txt
~$ sudo usermod -aG docker $USER
```

![Versión](doc/06.png)

## Descargar Imagen Hello World

![Hello World](doc/07.png)

```txt
~$ sudo docker pull hello-world
```

![Hello World](doc/08.png)

## Listar las imágenes contenidas en Docker

```txt
~$ sudo docker images
```

![Hello World](doc/09.png)

## Correr la imagen Hello World

```txt
~$ sudo docker run hello-world
```

![Hello World](doc/10.png)

## Buscar imágenes de Ubuntu para Docker

```txt
~$ sudo docker search ubuntu
```

![Ubuntu](doc/11.png)

## Descargar imagen de Ubuntu

```txt
~$ sudo docker pull ubuntu
```

```txt
~$ sudo docker images
```

![Ubuntu](doc/12.png)

## Correr un contenedor de Ubuntu

```txt
~$ sudo docker run ubuntu echo 'Hello world'
```

```txt
~$ sudo docker run -it ubuntu bash
```

![Ubuntu](doc/13.png)

## Listar contenedores activos

```txt
~$ sudo docker ps
```

Mientras un contenedor está activo

![Ubuntu](doc/14.png)

Cuando no hay contenedores activos

![Ubuntu](doc/15.png)
