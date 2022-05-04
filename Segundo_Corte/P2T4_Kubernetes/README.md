# Kubernetes

> Guía elaborada por: ***Carlos David Páez Ferreira***
>
> Guía Liderada por: ***Harvey Nicolás Echavarria Ortiz***
>
> Fecha: ***03 Mayo 2022***

## Configuraciones previas de Kubernetes

Necesitamos tener instalados Docker, Minikube, y Kubectl.

### Conocer la versión kubectl

```txt
kubectl version --client=true
```

![01](doc/01.png)

### Iniciar Minikube

```txt
minikube start
```

![02](doc/02.png)

### Minikube en Docker Desktop

![03](doc/03.png)

### Kubernetes habilitado en Docker Desktop

![04](doc/04.png)

### Listar nodos en el cluster de Kubernetes

```txt
kubectl get nodes
```

![05](doc/05.png)

### Listar la lista de comandos de Kubectl

```txt
kubectl --help
```

![06](doc/06.png)
![07](doc/07.png)

### Obtener los contextos de la configuración

```txt
kubectl config get-contexts
```

![08](doc/08.png)

## Recursos de Kubernetes

### Obtener los namespace

```txt
kubectl get ns
```

![09](doc/09.png)

### Observar los pods dentro del contenedor kube-system

```txt
kubectl -n kube-system get pods
```

![10](doc/10.png)

### Observar más información de los pods

```txt
kubectl -n kube-system get pods -o wide
```

![11](doc/11.png)

### Comprobar que Kubernetes crear un pod de respaldo en caso de que alguno falle o sea eliminado

Eliminamos el pod `kube-proxy-zkzgc` que se encuentra en el listado del punto anterior:

```txt
kubectl -n kube-system delete pod kube-proxy-zkzgc
```

![12](doc/12.png)

Volvemos a listar los pods y observamos un nuevo pod para el proxy:

```txt
kubectl -n kube-system get pods -o wide
```

![13](doc/13.png)

## Repositorio para hacer pruebas

Clonamos el siguiente repositorio [GitHub - PeladoNerd](https://github.com/pablokbs/peladonerd "peladonerd")

```txt
git clone https://github.com/pablokbs/peladonerd
```

![14](doc/14.png)

Nos ubicamos en el directorio `peladonerd/Kubernetes/35` y listamos todos los archivos que hay dentro de la carpeta:

![15](doc/15.png)

Vamos a acceder al archivo `01-pod.yaml`, el cual es un archivo de manifiesto que consta de las siguientes secciones:

- `apiVersion`: Versión de la api del recurso de Kubernetes
- `kind`: Tipo de recurso
- `metadata`: Etiquetas o nombres. En este caso se necesita el nombre que será el nombre del pod.
- `containers`: Contenedores que correrán dentro del pod, en este caso nginx.

Todos los contenedores que corren dentro del pod tienen la misma ip.

![16](doc/16.png)

### `01-pod.yaml` Aplicamos el manifiesto del Kubernetes

```txt
kubectl apply -f 01-pod.yaml
```

![17](doc/17.png)

#### Listar los pods

```txt
kubectl get pods
```

![18](doc/18.png)

#### Consola interactiva dentro del pod

```txt
kubectl exec -it nginx -- sh
```

![19](doc/19.png)

Ejecutar un comando dentro de la terminal interactiva:

```txt
ps fax
```

![20](doc/20.png)

#### Eliminar el pod de nginx

Eliminamos el pod de nginx, el cual no va a tener una copia de respaldo puesto que no se estableció una orden para ello.

```txt
kubectl delete pod nginx
```

![21](doc/21.png)

```txt
kubectl get pods
```

![22](doc/22.png)

### `02-pod.yaml`

Una de las opciones que se han agregado son las variables de entorno, que se componen de un nombre y un valor. Kubernetes tiene algo llamado downward api que son valores que se pueden heredar como la dirección ip del host de donde esta corriendo el pod. Así mismo se agrega la sección para limitar los recursos. Existen dos formas: request (son los recursos que le vamos a garantizar a este pod que siempre va a tener disponibles) y limits (Es el límite de recursos que el pod puede utilizar).

![23](doc/23.png)

#### Aplicar el manifiesto

```txt
kubectl apply -f 02-pod.yaml
```

![24](doc/24.png)

```txt
kubectl get pods
```

![25](doc/25.png)

Obtenemos toda la información de pod con el siguiente comando:

```txt
kubectl get pod nginx -o yaml
```

![26](doc/26.png)
![27](doc/27.png)
![28](doc/28.png)

#### Eliminar el pod

```txt
kubectl delete pod nginx
```

![29](doc/29.png)

### `04-deployment.yaml`

Un deployment es un template para crear pods.

![30](doc/30.png)

#### Aplicar el deployment

```txt
kubectl apply -f 04-deployment.yaml
```

![31](doc/31.png)

```txt
kubectl get pods
```

![32](doc/32.png)

#### Intentar eliminar uno de los despliegues

```txt
kubectl delete pod nginx-deployment-66c9c7669-bd7dk
```

![33](doc/33.png)

Como el deployment tiene configurado crear un pod de respaldo cuando se elimine alguno, podemos observar que crear un nuevo pod en cuanto se remueve otro.

```txt
kubectl get pods
```

![34](doc/34.png)

### `03-daemonset.yaml` Instalar un pod mediante DaemonSet

Tenemos el archivo `03-daemon.yaml`, dentro se configura el tipo como DaemonSet, el cual permite que al hacer deploy el pod este presente en todos los nodos. Este archivo ya no cuenta con réplicas pues dependerá de la cantidad de nodos que se tengan.

![35](doc/35.png)

#### Aplicar el despliegue de DaemonSet

```txt
kubectl apply -f 03-daemonset.yaml
```

![36](doc/36.png)

```txt
kubectl get pods
```

![37](doc/37.png)

```txt
kubectl get pods -o wide
```

![38](doc/38.png)

#### Comprobar el pod de respaldo

```txt
kubectl delete pod nginx-deployment-xlf8d
```

![39](doc/39.png)

```txt
kubectl get pods
```

![40](doc/40.png)
