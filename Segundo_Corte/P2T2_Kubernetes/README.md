# Kubernetes

> Guía elaborada por: ***Carlos David Páez Ferreira***
>
> Guía Liderada por: ***Harvey Nicolás Echavarria Ortiz***
>
> Fecha: ***19 Abril 2022***

Documentación base: [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)

## Kubernetes Basics Modules

![01](doc/01.png)

## Módulo 1: Crear un Kubernetes Cluster

Ingresamos a tutorial interactivo, y conectamos el entorno virtual:

![02](doc/02.png)

### Levantar un Cluster y correrlo

En el paso 1 comenzamos a ingresar los comandos que se nos muestran:

![03](doc/03.png)

Conocer la versión de minikube:

```txt
minikube version
```

Iniciar el cluster:

```txt
minikube start
```

![04](doc/04.png)

### Cluster version

![05](doc/05.png)

Verificar que kubectl esté instalado:

```txt
kubectl version
```

![06](doc/06.png)

### Detalles del Cluster

![07](doc/07.png)

Conocer los detalles del cluster:

```txt
kubectl cluster-info
```

Obtener los nodos del cluster:

```txt
kubectl get nodes
```

![08](doc/08.png)

## Módulo 2: Desplegar una aplicación

Ingresamos al segundo módulo interactivo para desplegar una aplicación dentro de los usando kubectl.

![09](doc/09.png)

### kubectl básicos

![10](doc/10.png)

Verificamos si el kubectl está configurado para comunicarse con el cluster y además obtenemos los nodos del módulo:

```txt
kubectl version
```

```txt
kubectl get nodes
```

![11](doc/11.png)

### Desplegar nuestra aplicación

![12](doc/12.png)

Ejecutamos el comando para correr una aplicación provista por el bootcamp de Kubernetes:

```txt
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

Para obtener la lista de despliegues realizados, usamos el siguiente comando:

```txt
kubectl get deployments
```

![13](doc/13.png)

### Visualizar nuestra app

![14](doc/14.png)

![15](doc/15.png)

Vamos a abrir una segunda terminal en la que creamos un proxy con kubectl, el cual da paso a las comunicaciones dentro del ancho del cluster en una red privada.

```txt
echo -e "\n\n\n\e[92mStarting Proxy. After starting it will not output a response. Please click the first Terminal Tab\n"; 
kubectl proxy
```

![16](doc/16.png)

Una vez tenemos la conexión establecida, podemos hacerle una petición al endpoint para obtener la versión:

```txt
curl http://localhost:8001/version
```

![17](doc/17.png)

Vamos a obtener el nombre del Pod y almacenarlo en una variable de entorno:

```txt
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME
```

![18](doc/18.png)

Ahora, podemos acceder al Pod a través de la API corriendo:

```txt
curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/
```

![19](doc/19.png)

## Módulo 3: Visualización de los Pods y Nodos

Ingresamos al tutorial interactivo del módulo 3 y conectamos el entorno virtual.

![20](doc/20.png)

### Revisar la configuración de la aplicación

![21](doc/21.png)

![22](doc/22.png)

Vamos a revisar que la aplicación que desplegamos, este corriendo:

```txt
kubectl get pods
```

![23](doc/23.png)

Luego observamos los contenedores que están dentro del Pod y que imágenes los están utilizando:

```txt
kubectl describe pods
```

![24](doc/24.png)

### Mostrar la app en la terminal

![25](doc/25.png)

Dentro de una nueva terminal levantamos un proxy para poder acceder a los Pods que están aislados, con el fin de interactuar con ellos y hacer debug.

```txt
kubectl proxy
```

![26](doc/26.png)

Luego, obtenemos el nombre del Pod y lo guardamos en una variable de entorno, para posteriormente consultarlo:

```txt
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME
```

![27](doc/27.png)

Luego, mediante curl hacemos una request a nuestra aplicación:

```txt
curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/
```

![28](doc/28.png)

### Ver los logs de los contenedores

![29](doc/29.png)

Ejecutamos el siguiente comando para obtener los logs de un Pod especifico:

```txt
kubectl logs $POD_NAME
```

![30](doc/30.png)

### Ejecutar comandos en el contenedor

![31](doc/31.png)

![32](doc/32.png)

Vamos a ejecutar un comando para listar las variables de entorno contenidas por el Pod que se está ejecutando:

```txt
kubectl exec $POD_NAME -- env
```

![33](doc/33.png)

Luego, iniciamos una sesión de terminal dentro del contenedor del Pod:

```txt
kubectl exec -ti $POD_NAME -- bash
```

![34](doc/34.png)

Teniendo el bash abierto dentro del container, vamos a observar el archivo `server.js` del proyecto NodeJS que está desplegado:

```txt
cat server.js
```

![35](doc/35.png)

Luego podemos verificar que la aplicación este corriendo dentro del contenedor, con el siguiente comando:

```txt
curl localhost:8080
```

![36](doc/36.png)

Podemos salir de la terminal del container usando el comando:

```txt
exit
```

![37](doc/37.png)

## Módulo 4: Exponer la aplicación al público

Abrimos el tutorial interactivo y conectamos la máquina virtual:

![38](doc/38.png)

### Crear un nuevo servicio

![39](doc/39.png)

![40](doc/40.png)

Verificamos que nuestra aplicación está corriendo

```txt
kubectl get pods
```

![41](doc/41.png)

Luego listamos todos los servicios que están corriendo:

```txt
kubectl get services
```

![42](doc/42.png)

Para crear un nuevo servicio y exponerlo al trafico externo, nosotros usamos el comando para exponer, teniendo como parámetro el NodePort:

```txt
kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
```

![43](doc/43.png)

De nuevo, listamos todos los servicios:

```txt
kubectl get services
```

![44](doc/44.png)

Para encontrar el puerto que está siendo abierto externamente, usamos el siguiente comando:

```txt
kubectl describe services/kubernetes-bootcamp
```

![45](doc/45.png)

Creamos una variable de entorno con el valor del puerto dl nodo asignado:

```txt
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT
```

![46](doc/46.png)

Luego testeamos la app expuesta usando curl, la Ip del nodo y el puerto de exposición externo:

```txt
curl $(minikube ip):$NODE_PORT
```

![47](doc/47.png)

### Usar labels

![48](doc/48.png)

![49](doc/49.png)

Podemos observar el nombre por defecto que se asigno al Pod:

```txt
kubectl describe deployment
```

![50](doc/50.png)

También podemos listar un pod con un label especifico:

```txt
kubectl get pods -l app=kubernetes-bootcamp
```

![51](doc/51.png)

O también podemos listar un servicio por su nombre:

```txt
kubectl get services -l app=kubernetes-bootcamp
```

![52](doc/52.png)

Ahora, obtenemos el nombre del Pod y lo guardamos en una variable de entorno:

```txt
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME
```

![53](doc/53.png)

Vamos a aplicar un nuevo label:

```txt
kubectl label pods $POD_NAME version=v1
```

![54](doc/54.png)

Ahora podemos listar el pod con el nuevo label:

```txt
kubectl describe pods $POD_NAME
```

![55](doc/55.png)

Hacemos una consulta para listar todos los pods que están usando nuestro nuevo label:

```txt
kubectl get pods -l version=v1
```

![56](doc/56.png)

### Borrar un servicio

![57](doc/57.png)

Podemos eliminar un servicio usando el label relacionado al mismo:

```txt
kubectl delete service -l app=kubernetes-bootcamp
```

![58](doc/58.png)

Confirmamos que se haya eliminado:

```txt
kubectl get services
```

![59](doc/59.png)

Para confirmar que la ruta no está expuesta, usamos curl:

```txt
curl $(minikube ip):$NODE_PORT
```

![60](doc/60.png)

Con el anterior comando comprobamos que la app no estaba expuesta al público, pero con el siguiente comando, podemos comprobar que la app se mantienen corriendo en el Pod:

```txt
kubectl exec -ti $POD_NAME -- curl localhost:8080
```

![61](doc/61.png)

## Módulo 5: Ejecutar múltiples instancias de nuestra app

Iniciamos el tutorial interactivo del módulo

![62](doc/62.png)

### Escalar un despliegue

![63](doc/63.png)

![64](doc/64.png)

![65](doc/65.png)

Listamos los despliegues:

```txt
kubectl get deployments
```

![66](doc/66.png)

Para observar el ReplicaSet creado por el despliegue, ejecutamos el siguiente comando:

```txt
kubectl get rs
```

![67](doc/67.png)

Lo siguiente será escalar el despliegue a 4 replicas:

```txt
kubectl scale deployments/kubernetes-bootcamp --replicas=4
```

![68](doc/68.png)

Listamos de nuevo los despliegues:

```txt
kubectl get deployments
```

![69](doc/69.png)

Verificar si el número de pods ha cambiado:

```txt
kubectl get pods -o wide
```

![70](doc/70.png)

Podemos revisar los cambios en los events log del despliegue:

```txt
kubectl describe deployments/kubernetes-bootcamp
```

![71](doc/71.png)

### Balanceo de Carga

![72](doc/72.png)

Para encontrar la IP expuesta y el puerto, podemos usar el siguiente comando para describir el servicio:

```txt
kubectl describe services/kubernetes-bootcamp
```

![73](doc/73.png)

Creamos una variable de entorno que contenga el puerto del nodo:

```txt
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT
```

![74](doc/74.png)

Luego, hacemos múltiples peticiones a la IP y puerto expuesto, esto para demostrar que en cada petición la carga se balancea con los diferentes Pods:

```txt
curl $(minikube ip):$NODE_PORT
```

![75](doc/75.png)

### Reducir proporcionalmente

![76](doc/76.png)

Para reducir el servicio a 2 replicas, usamos el siguiente comando:

```txt
kubectl scale deployments/kubernetes-bootcamp --replicas=2
```

![77](doc/77.png)

Para listar los despliegues y revisar los cambios usamos el siguiente comando:

```txt
kubectl get deployments
```

![78](doc/78.png)

Ahora listamos el número de pods:

```txt
kubectl get pods -o wide
```

![79](doc/79.png)

## Módulo 6: Ejecutar una actualización continua

Levantamos la máquina virtual del módulo 6.

![80](doc/80.png)

### Actualizar la versión de la aplicación

![81](doc/81.png)

Listamos los despliegues:

```txt
kubectl get deployments
```

![82](doc/82.png)

Listamos los Pods:

```txt
kubectl get pods
```

![83](doc/83.png)

Para ver la versión actual de la imagen de la aplicación usamos el siguiente comando:

```txt
kubectl describe pods
```

![84](doc/84.png)

Para actualizar la versión de nuestra imagen usamos el siguiente comando:

```txt
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```

![85](doc/85.png)

El comando anterior notifica al despliegue que use diferentes imágenes en nuestra app para una actualización constante. Cuando listamos los pods, podemos observar que el último ha sido terminado:

```txt
kubectl get pods
```

![86](doc/86.png)

### Verificar una actualización

![87](doc/87.png)

![88](doc/88.png)

Verificamos la IP y puerto expuesto de la app corriendo:

```txt
kubectl describe services/kubernetes-bootcamp
```

![89](doc/89.png)

Guardamos el puerto del nodo en una variable de entorno:

```txt
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT
```

![90](doc/90.png)

Hacemos una petición a la IP expuesta:

```txt
curl $(minikube ip):$NODE_PORT
```

![91](doc/91.png)

Podemos confirmar la actualización con el siguiente comando:

```txt
kubectl rollout status deployments/kubernetes-bootcamp
```

![92](doc/92.png)

Observamos la versión actual de la imagen al listar los pods:

```txt
kubectl describe pods
```

![93](doc/93.png)

### Retroceder una actualización

![94](doc/94.png)

![95](doc/95.png)

Vamos a lanzar una nueva actualización:

```txt
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10
```

![96](doc/96.png)

Observamos el estatus del despliegue:

```txt
kubectl get deployments
```

![97](doc/97.png)

Listamos todos los Pods:

```txt
kubectl get pods
```

![98](doc/98.png)

Algunos Pods tienen el error `ImagePullBackOff`, por lo que ejecutamos el siguiente comando para más detalles:

```txt
kubectl describe pods
```

![99](doc/99.png)

![100](doc/100.png)

En la sección de los eventos de salida en los pods afectados, podemos observar que el error se ocasiona por que no se encuentra la nueva versión en el repositorio. Para retroceder a la última versión, usamos el siguiente comando:

```txt
kubectl rollout undo deployments/kubernetes-bootcamp
```

![101](doc/101.png)

De nuevo listamos los pods para observar los cambios:

```txt
kubectl get pods
```

![102](doc/102.png)

Para observar la versión de la imagen que están corriendo nuestro pods, usamos el siguiente comando:

```txt
kubectl describe pods
```

![103](doc/103.png)
