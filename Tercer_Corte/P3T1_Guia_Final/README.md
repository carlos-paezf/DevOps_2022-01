# Guía Final de Tercer Corte

> Guía elaborada por: ***Carlos David Páez Ferreira***
>
> Guía Liderada por: ***Harvey Nicolás Echavarria Ortiz***
>
> Fecha: ***17 Mayo 2022***

## Apartado 1: Docker

### Verificar la instalación de Docker

```txt
docker --version
```

![01](doc/01.png)

### Instalar imágenes necesarias

Instalar las imágenes de MySQL 5.7 y PHP 7.0 junto Apache.

```txt
docker pull mysql:5.7 & docker pull php:7.0-apache
```

![02](doc/02.png)

### Verificar las imágenes instaladas

![03](doc/03.png)

![04](doc/04.png)

```txt
docker images
```

![05](doc/05.png)

### Correr imagen de MySQL

Vamos a ejecutar diferentes banderas al momento de correr la imagen de MySQL:

- `-p`: Indica el puerto por el cual escuchará la aplicación y el puerto del contenedor.
- `--name`: Indica el nombre del proceso o contenedor que se iniciará.
- `-v`: Indica que se creará un volumen, el cual permite almacenar datos de la DB en una carpeta con el fin de salvarlos en caso de que el contenedor se apague o se caiga. La primera rta hace referencia a la carpeta que se creará en nuestro equipo, la segunda hace referencia a la dirección del contenedor por defecto.
- `-e`: Indica la contraseña
- `-d`, para que MySQL corra en segundo plano.

```txt
docker run -p 3307:3306 --name database -v C:/Users/carlo/.../P3T1_Guia_Final:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7
```

![06](doc/06.png)

Verificamos que este corriendo nuestro contenedor:

```txt
docker ps
```

![07](doc/07.png)

Dentro del directorio que hemos escogido, creamos una carpeta para almacenar una página web, y dentro de este directorio, añadimos un nuevo folder para la base de datos.

![08](doc/08.png)

### Correr la imagen de PHP

Vamos a correr la imagen de PHP con las siguientes banderas:

- `-p`: Indicar el puerto
- `-name`: Indicar el nombre del proceso o contenedor
- `-v`: Indicar la creación de un volumen en el que almacenaremos los archivos de nuestro proyecto.
- `-d`: Correr en segundo plano
- `--link`: Comunicar entre el contenedor de PHP y la base de datos.

```txt
docker run -p 1000:80 -v C:/Users/carlo/.../P3T1_Guia_Final/Servicio_Web:/var/www/html --name servidorphp -d --link database php:7.0-apache
```

![09](doc/09.png)

```txt
docker ps
```

![10](doc/10.png)

Creamos un archivo llamado `index.php` dentro de la carpeta de `Servicio_Web`:

![11](doc/11.png)

Dentro de nuestro nuevo archivo, escribimos lo siguiente:

```php
<?php
phpinfo();
?>
```

Luego, en el navegador ingresamos la siguiente ruta: `http://localhost:1000` y debemos obtener lo siguiente:

![12](doc/12.png)

### Comprobar que el servidor MySQL funciona

Entrar a la consola interactiva del contenedor de mysql:

```txt
docker exec -i -t database bash
```

![13](doc/13.png)

Ejecutar MySQL:

```txt
mysql -u root -p
```

![14](doc/14.png)

Listar las bases de datos:

```sql
show databases;
```

![15](doc/15.png)

Crear base de datos de usuarios:

```sql
create database usuarios;
```

![16](doc/16.png)

Usar la base de datos recién creada:

```sql
use usuarios;
```

![17](doc/17.png)

Crear tabla tabla de clientes:

```sql
create table clientes(username varchar(20) primary key not null, nombre varchar(30), correo varchar(50), contra varchar(20));
```

![18](doc/18.png)

Insertar datos dentro de la tabla:

```sql
insert into clientes values ('neo', 'neo', 'neo@gmail.com', 'neo_password');
```

![19](doc/19.png)

### Conectar PHP con la base de datos

Dentro del archivo `index.php` añadimos las siguientes líneas:

```php
<?php
$conn = mysqli_connect("database:3306", "root", "password", "usuarios");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully";
?>
```

Cuando regresamos a la ruta dentro del navegador, vamos a observar el siguiente error:

![20](doc/20.png)

Esto se debe a que la función `mysqli_connection()` no se encuentra definida, puesto que el servidor que tenemos instalado de php no tiene la extensión para conectarse a mysql. Para solucionar dicho error debemos seguir estos pasos:

- Abrir el contenedor de PHP por medio del siguiente comando:
  
  ```txt
  docker exec -i -t servidorphp /bin/bash
  ```

  ![21](doc/21.png)

- Ir al directorio `/` y listar los archivos y directorios:
  
  ![22](doc/22.png)

- Usamos el siguiente comando para instalar la extensión necesaria:
  
  ```txt
  docker-php-ext-install mysqli
  ```

  ![23](doc/23.png)
  
  Debemos copiar la ruta que aparece en la sección de `Installing shared extensions` al momento de terminar la instalación de la extensión. (`/usr/local/lib/php/extensions/no-debug-non-zts-20151012/`)

  ![24](doc/24.png)

- Nos ubicamos dentro de la ruta `/usr/local/etc/php/` y listamos los archivos que se encuentran dentro de dicho directorio
  
  ![25](doc/25.png)

- Instalamos nano con los siguientes comandos:
  
  ```txt
  apt-get update
  ```

  ```txt
  apt-get install nano
  ```

  ![26](doc/26.png)

- Abrimos el archivo `php.ini-development` mediante el siguiente comando:
  
  ```txt
  nano php.ini-development
  ```

  ![27](doc/27.png)

  Luego, buscamos el apartado de rutas dinámicas y añadimos la ruta que teníamos copiada, y salimos del editor con `Ctrl + X`, `y` y `Enter`:

  ![28](doc/28.png)

- Aplicamos el mismo procedimiento para el archivo de `php.init-production`:
  
  ![29](doc/29.png)

- Reiniciamos el contenedor de PHP con el siguiente comando:
  
  ```txt
  docker restart servidorphp
  ```

  ![30](doc/30.png)

  ![31](doc/31.png)

- Recargamos el navegador, y esto será lo que debe aparecer:
  
  ![32](doc/32.png)

### Página Web

Para efectos del taller vamos a añadir algunos archivos a nuestro directorio `Servicio_Web`:

![33](doc/33.png)

Dentro del archivo `conexion.php` y `registro.php` hacemos los siguientes cambios en la variable de conexión a la base de datos:

```php
$con = mysqli_connect("database:3306","root","password","usuarios");
```

Si volvemos al navegador en la dirección `http://localhost:1000`, vamos a observar lo siguiente:

![34](doc/34.png)

![35](doc/35.png)

![36](doc/36.png)

![37](doc/37.png)

Si vamos al contenedor de la base de datos, podemos verificar que se ha registrado el usuario:

```txt
docker exec -i -t database bash
```

```txt
mysql -u root -p
```

```sql
use usuarios;
```

```sql
select * from clientes;
```

![38](doc/38.png)

### Docker-Compose

Dentro del directorio `Servicio_Web` creamos el archivo `docker-compose.yml`, dentro del cual tendremos la siguiente información:

```yml
version: '3'

services:
    mysql:
        image: mysql:5.7
        container_name: docker-mysql
        environment:
            MYSQL_DATABASE: usuarios
            MYSQL_ROOT_USER: user_docker
            MYSQL_USER: user_docker
            MYSQL_PASSWORD: password
            MYSQL_ROOT_PASSWORD: password
        ports:
            - "3307:3306"
        restart: always

    web:
        image: php:7.0-apache
        container_name: docker-php
        ports:
            - "1000:80"
        volumes:
            - ./www:/var/www/html
        links:
            - mysql
```

Vamos a bajar nuestro contenedores:

```txt
docker stop database & docker stop servidorphp
```

![39](doc/39.png)

Y ahora usamos el siguiente comando dentro del directorio `Servicio_Web`:

```txt
docker compose-up
```

![40](doc/40.png)

![41](doc/41.png)

Volvemos a intentar correr nuestra aplicación dentro del navegador, y recibiremos el siguiente mensaje debido a que no se configuro los directorio indicies (`index.php`, `index.html`).

![42](doc/42.png)

![43](doc/43.png)

## Apartado 2: Kubernetes

### Paso 1: Tutorial Interactivo Minikube

Debemos ingresa a la siguiente página para resolver el tutorial interactivo que se nos presenta: [Hello Minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)

![44](doc/44.png)

#### Crear un cluster de minikube

1. Abrir la terminal

   ![45](doc/45.png)

2. Abrir el dashboard de Kubernetes en el navegador:

   ```txt
   minikube dashboard
   ```

   ![46](doc/46.png)

3. Solo en el entorno de Katacoda: En la parte superior de la terminar, presionar el símbolo de `+`, y luego hacer click en `Select port to view on Host 1`:

   ![47](doc/47.png)

4. Solo en el entorno de Katacoda: Escribe `30000` y haz click en `Display Port`:

   ![48](doc/48.png)

   ![49](doc/49.png)

#### Abrir Dashboard con URL

Si tu no quieres abrir un navegador web, corre el comando de dashboard con la bandera adicional `--flag` para emitir una URL:

```txt
minikube dashboard --flag
```

![50](doc/50.png)

#### Crear un despliegue

1. Use el comando `kubectl create` para crear un despliegue que maneje un Pod. El Pod corre un Container basado en imagen provista de Docker:

   ```txt
   kubectl create deployment hello-node --image=k8s.gcr.io/echoserver:1.4
   ```

   ![51](doc/51.png)

2. Visualiza el despliegue

   ```txt
   kubectl get deployments
   ```

   ![52](doc/52.png)

3. Visualiza el pod:

   ```txt
   kubectl get pods
   ```

   ![53](doc/53.png)

4. Visualiza los eventos del cluster

   ```txt
   kubectl get events
   ```

   ![54](doc/54.png)

5. Visualiza la configuración de `kubectl`

   ```txt
   kubectl config view
   ```

   ![55](doc/55.png)

#### Crear un Servicio

1. Exponer el Pod al internet público usado el comando `kubectl expose`:

   ```txt
   kubectl expose deployment hello-node --type=LoadBalancer --port=8080
   ```

   La bandera `--type=LoadBalancer` indica que tu quieres exponer tu servicio fuera del cluster.

   El código de la aplicación dentro de la imagen `k8s.gcr.io/echoserver` solo escucha el puerto TCP 8080. Si tu quieres usar `kubectl expose` para exponer en un puerto diferente, los clientes no podrán conectarse al otro puerto.

   ![56](doc/56.png)

2. Visualizar el servicio creado

   ```txt
   kubectl get services
   ```

   ![57](doc/57.png)

   En los proveedores de cloud que soportan balanceo de carga, una IP externa debe ser provista para acceder al servicio. En minikube, el tipo `LoadBalancer` hace accesible el servicio mediante el comando `minikube service`

3. Correr el siguiente comando:

   ```txt
   minikube service hello-node
   ```

   ![58](doc/58.png)

4. Solo en el entorno Katacoda: Haz click en el símbolo de `+`, y selecciona `Select port to view on Host 1`.

   ![59](doc/59.png)

5. Solo en el entorno Katacoda: Tenga en cuenta el puerto de 5 dígitos que se muestra en oposición al puerto `8080` en la salida del punto 3. Este número de puerto es generado aleatoriamente y puede ser diferente al tuyo. Ingresa tu número en la caja de texto del puerto, y haz click en `Display Port`.

   Esto abrirá una ventana del navegador que servirá tu app y mostrará la respuesta de la aplicación.

   ![60](doc/60.png)

   ![61](doc/61.png)

#### Activar Complementos

1. Listar los complementos actualmente soportados

   ```txt
   minikube addons list
   ```

   ![62](doc/62.png)

2. Activar un complemento, por ejemplo `metrics-server`:

   ```txt
   minikube addons enable metrics-server
   ```

   ![63](doc/63.png)

3. Visualizar el Pod y el Servicio que creaste:

   ```txt
   kubectl get pod,svc -n kube-system
   ```

   ![64](doc/64.png)

4. Desactivar `metrics-server`

   ```txt
   minikube addons disable metrics-server
   ```

   ![65](doc/65.png)

#### Limpieza

1. Vamos a limpiar los recursos que creaste en el cluster

   ```txt
   kubectl delete service hello-node & kubectl delete deployment hello-node
   ```

   ![66](doc/66.png)

2. Opcionalmente, detén la máquina virtual de Minikube

   ```txt
   minikube stop
   ```

   ![67](doc/67.png)

3. Opcionalmente, elimina la maquina virtual de Minikube

   ```txt
   minikube delete
   ```

   ![68](doc/68.png)

### Paso 2: Kubernetes en Windows

#### Conocer la versión de Kubectl

```txt
kubectl version --client=true
```

![69](doc/69.png)

#### Iniciar minikube

```txt
minikube start --driver=docker
```

![70](doc/70.png)

![71](doc/71.png)

#### Estatus de minikube

```txt
minikube status
```

![72](doc/72.png)

#### Habilitar Kubernetes en Docker

![73](doc/73.png)

#### Observar los nodos de nuestro cluster de Kubernetes

```txt
kubectl get nodes
```

![74](doc/74.png)

### Paso 3: Tutorial Interactivo

Debemos ingresar a la siguiente URL para realizar el tutorial indicado: [Implementación de la aplicación PHP Guestbook con Redis](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/)

#### Creación del despliegue de Redis

El archivo de manifiesto, especifica un controlador de Despliegue que corre una replica única replica del Pod Redis.

1. Lanzar una terminar de Windows en donde descargaste los archivos manifiestos.
2. Aplicar la implementación de Redis desde el archivo `redis-leader-deployment.yaml`

   ```txt
   kubectl apply -f https://k8s.io/examples/application/guestbook/redis-leader-deployment.yaml
   ```

   ![75](doc/75.png)

3. Consultar la lista de Pods, para verificar que el Pod de Redis esté corriendo:

   ```txt
   kubectl get pods
   ```

   ![76](doc/76.png)

4. Correr el siguiente comando para ver los logs del Pod de Redis líder

   ```txt
   kubectl logs -f deployment/redis-leader
   ```

   ![77](doc/77.png)

#### Creación del servicio líder de Redis

La aplicación de guestbook necesita conectarse con Redis para escribir su data. Tu necesitas aplicar un Servicio al proxy de trafico del Pod de Redis. Un servicio define la política de acceso a los Pods.

1. Aplicar el servicio de Redis desde el archivo `redis-leader-server.yaml`

   ```txt
   kubectl apply -f https://k8s.io/examples/application/guestbook/redis-leader-service.yaml
   ```

   ![78](doc/78.png)

2. Listar los servicios, para verificar que el servicio de Redis esté corriendo:

   ```txt
   kubectl get service
   ```

   ![79](doc/79.png)

#### Configurar los seguidores de Redis

Aunque el Redis líder es un único Pod, puedes hacer que esté altamente disponible y satisfacer las demandas de tráfico agregando algunos seguidores o réplicas de Redis.

1. Aplicar el despliegue de Redis desde el archivo `redis-follower-deployment.yaml`:

   ```txt
   kubectl apply -f https://k8s.io/examples/application/guestbook/redis-follower-deployment.yaml
   ```

   ![80](doc/80.png)

2. Verificar que las 2 replicas de Redis estén corriendo:

   ```txt
   kubectl get pods
   ```

   ![81](doc/81.png)

#### Creación del Servicio de seguidores de Redis

La aplicación guestbook necesita comunicarse con los seguidores de Redis para leer la data. Para hacer que los seguidores de Redis sean detectables, debemos configurar otro servicio.

1. Aplicamos el servicio de Redis desde el archivo `redis-follower-service.yaml`.

   ```txt
   kubectl apply -f https://k8s.io/examples/application/guestbook/redis-follower-service.yaml
   ```

   ![82](doc/82.png)

2. Consultamos que los servicios de Redis estén corriendo:

   ```txt
   kubectl get service
   ```

   ![83](doc/83.png)

#### Configurar y exponer el Frontend de Guestbook: Crear un despliegue del Frontend

1. Aplicamos el despliegue del frontend desde `frontend-deployment.yaml`

   ```txt
   kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-deployment.yaml
   ```

   ![84](doc/84.png)

2. Consultar los pods para verificar que 3 replicas del frontend estén corriendo:

   ```txt
   kubectl get pods -l app=guestbook -l tier=frontend
   ```

   ![85](doc/85.png)

#### Creando el servicio del Frontend

1. Aplicamos el servicio del frontend desde el archivo `frontend-service.yaml`:

   ```txt
   kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-service.yaml
   ```

   ![86](doc/86.png)

2. Consultar la lista de servicios para verificar que esté corriendo el servicio del Frontend.

   ```txt
   kubectl get services
   ```

   ![87](doc/87.png)

#### Observar el servicio del frontend via `kubectl port-forward`

1. Correr el siguiente comando por el puerto delantero `8080` en tu maquina local, al puerto `80` en el servicio.

   ```txt
   kubectl port-forward svc/frontend 8080:80
   ```

   ![88](doc/88.png)

2. Abrir la siguiente dirección en el navegador: `http://localhost:8080`

   ![89](doc/89.png)

#### Observar el servicio del frontend via `LoadBalancer`

1. Ejecuta el siguiente comando para obtener la dirección IP del servicio del frontend.

   ```txt
   kubectl get service frontend
   ```

   ![90](doc/90.png)

2. Copiar la dirección IP externa, y carga una página en el navegador para observar el frontend

#### Escalar el Frontend Web

1. Ejecutar el siguiente comando para aumentar el número de pods del frontend:

   ```txt
   kubectl scale deployment frontend --replicas=5
   ```

   ![91](doc/91.png)

2. Consultar los pods para verificar el número de pods del frontend corriendo

   ```txt
   kubectl get pods
   ```

   ![92](doc/92.png)

3. Correr el siguiente comando para disminuir el número de de pods del frontend corriendo

   ```txt
   kubectl scale deployment frontend --replicas=2
   ```

   ![93](doc/93.png)

4. Consultar los pods para verificar el número de pods del frontend corriendo

   ```txt
   kubectl get pods
   ```

   ![94](doc/94.png)

#### Limpiando

Eliminar los despliegues y servicios también elimina cualquier Pod corriendo. Use labels para eliminar múltiples recursos con un comando.

```txt
kubectl delete deployment -l app=redis
```

```txt
kubectl delete service -l app=redis
```

```txt
kubectl delete deployment frontend
```

```txt
kubectl delete service frontend
```

![95](doc/95.png)

Consulta la lista de pods que están corriendo:

```txt
kubectl get pods
```

![96](doc/96.png)
