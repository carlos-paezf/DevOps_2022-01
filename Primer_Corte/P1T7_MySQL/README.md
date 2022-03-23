# MySQL Server

> Guía elaborada por: ***Carlos David Páez Ferreira***
>
> Guía Liderada por: ***Harvey Nicolás Echavarria Ortiz***
>
> Fecha: ***17 Marzo 2022***

## Instalar la imagen de MySQL

```txt
~$ sudo docker pull mysql/mysql-server:latest
```

![v](doc/01.png)

## Correr un contenedor con MySQL

```txt
~$ docker run --name=firstmysql -d mysql/mysql-server:latest
```

![v](doc/02.png)

## Listar los contenedores activos

```txt
~$ docker ps --format="$DOCKER_FORMAT"
```

![v](doc/03.png)

## Instalar MySQL-Client

```txt
~$ sudo apt-get install mysql-client
```

![v](doc/04.png)

## Listar las imágenes almacenadas

```txt
~$ docker images
```

![v](doc/05.png)

## Mostrar los logs del contenedor

```txt
~$ docker logs firstmysql
```

![v](doc/06.png)

## Ejecutar la consola interactiva

```txt
~$ docker exec -it firstmysql bash
```

![v](doc/07.png)

## Ingresar las credenciales de mysql

```txt
~$ mysql -u root -p
```

![v](doc/08.png)

## Tener en cuenta la contraseña

![v](doc/09.png)

## Cambiar la contraseña del Root

```txt
mysql> ALTER USER 'root'@'localhost' INDENTIFIED BY 'root_password';
```

![v](doc/10.png)

## Comandos en SQL

### Mostrar bases de datos

```sql
SHOW databases;
```

![v](doc/11.png)

### Crear una base de datos

```sql
CREATE DATABASE db_test;
```

![v](doc/12.png)

### Usar la base de datos

```sql
USE db_test;
```

![v](doc/13.png)

### Crear una nueva tabla

```sql
CREATE TABLE person (person_id INT, person_name VARCHAR(50), person_email VARCHAR(50));
```

![v](doc/14.png)

### Mostrar las tablas actuales

```sql
SHOW TABLES;
```

![v](doc/15.png)

### Crear una tabla para estudiantes

```sql
CREATE TABLE student (student_id INT, student_name VARCHAR(50), student_email VARCHAR(50));
```

![v](doc/16.png)

### Mostrar las nuevas tablas

```sql
SHOW TABLES;
```

![v](doc/17.png)

### Mostrar las columnas de la tabla persona

```sql
DESCRIBE person;
```

![v](doc/18.png)

### Insertar datos en la tabla persona

```sql
INSERT INTO person (person_id, person_name, person_email) VALUES (1, 'Persona 1', 'correo1');
```

```sql
INSERT INTO person (person_id, person_name, person_email) VALUES (2, 'Persona 2', 'correo2');
```

![v](doc/19.png)

### Mostrar las columnas de la tabla student

```sql
DESCRIBE student;
```

![v](doc/20.png)

### Insertar datos en la tabla de student

```sql
INSERT INTO student (student_id, student_name, student_email) VALUES (1, 'Estudiante 1', 'correo1');
```

```sql
INSERT INTO student (student_id, student_name, student_email) VALUES (2, 'Estudiante 2', 'correo2');
```

![v](doc/21.png)

### Mostrar todos los datos de persona

```sql
SELECT * FROM person;
```

![v](doc/22.png)

### Mostrar todos los datos de estudiantes

```sql
SELECT * FROM student;
```

![v](doc/23.png)

### Salir de la consola

```sql
EXIT;
```

![v](doc/24.png)
