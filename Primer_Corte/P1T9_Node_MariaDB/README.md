# Node y Maria DB

## Verificar las instalaciones de Docker y Node

```txt
~$ docker --version
```

```txt
~$ node --version
```

![v](doc/01.png)

## Crear un directorio para el proyecto

![v](doc/02.png)

## Inicializar el proyecto de node

```txt
~$ npm init -y
```

![v](doc/03.png)

## Contenido inicial del package.json

![v](doc/04.png)

## Instalar los paquetes necesarios

```txt
~$ npm i express mariadb
```

![v](doc/05.png)

## Verificar que ya estén los node_modules

![v](doc/06.png)

![v](doc/07.png)

## Crear un archivo index.js

En este archivo configuramos nuestro primer servidor.

![v](doc/08.png)

## Crear un archivo database.js

En este archivo establecemos la configuración con nuestra base de datos en MariaDB

![v](doc/09.png)

## Correr un contenedor con la imagen de MariaDB v. 10.4

```txt
~$ docker run -d -p 3307:3306 --name mariadb -e MYSQL_ROOT_PASSWORD=password mariadb/server:10.4
```

![v](doc/10.png)

## Verificar que la imagen se haya instalado

```txt
~$ docker images
```

![v](doc/11.png)

![v](doc/12.png)

## Verificar los contenedores activos

```txt
~$ docker ps
```

![v](doc/13.png)

![v](doc/14.png)

## Validar el acceso a MariaDB

```txt
~$ mysql --host 127.0.0.1 -P 3307 -u root -p
```

![v](doc/15.png)

![v](doc/16.png)

## Ejecutar sentencias SQL

### Mostrar las bases de datos

```sql
> SHOW DATABASES;
```

![v](doc/17.png)

### Crear una nueva DB

```sql
> CREATE DATABASE docker_node_database;
```

![V](doc/18.png)

```sql
> SHOW DATABASES;
```

![v](doc/19.png)

### Usar la base de datos recién creada

```sql
> USE docker_node_database;
```

![v](doc/20.png)

### Seleccionar la base de datos

```sql
> SELECT DATABASE();
```

![V](doc/21.png)

### Crear una nueva tabla

```sql
> CREATE TABLE products(name VARCHAR(100));
```

![v](doc/22.png)

### Describir el contenido de la tabla productos

```sql
> DESCRIBE products;
```

![v](doc/23.png)

### Insertar algunos registros

```sql
> INSERT INTO products VALUES ('laptop'), ('mouse'), ('keyboard');
```

![v](doc/24.png)

### Listar los registros

```sql
> SELECT * FROM products;
```

![v](doc/25.png)

## Conexión a MariaDB

![v](doc/26.png)

## index.js

![v](doc/27.png)

## Correr el servidor

Vamos a correr el servidor con algunos de los siguientes 2 comandos:

```txt
~$ node src/index.js
```

```txt
~$ npm run dev
```

![v](doc/28.png)

## Acceder al servicio

Entramos a la ruta `http://localhost:3000/products`

![v](doc/29.png)

## Probar en algún API Client

Vamos a hacer la prueba del endpoint dentro de Postman.

![v](doc/30.png)
