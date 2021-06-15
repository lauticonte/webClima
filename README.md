
# webClima ⛅
Aplicación web que muestra el clima en las principales ciudades del mundo, las carga a Strapi (CMS que organiza y almacena datos) y dibuja gráficos con la información guardada.
## Instalación 


- **Instalar Docker**
> **Linux**:
```
sudo apt install snapd
sudo snap install docker
```
> Con Docker ya instalado, vamos a hacer que podamos ejecutar los comandos sin necesidad de sudo:
```
sudo addgroup --system docker
sudo adduser $USER docker
newgrp docker
sudo snap disable docker
sudo snap enable docker
```
> Donde `$USER` es su usuario de Linux.
<hr>

> **Windows**:  

`<link>` https://docs.docker.com/docker-for-windows/install/

<hr>

- **Clonar el repositorio de webClima**
```
git clone https://github.com/lauticonte/webClima
```
<hr>

- **Instalar Strapi, mySQL y el backend.**
```
cd webClima
docker-compose up
```
>Esperar que se instale todo y aparezca en la terminal:
```
To manage your project, go to the administration panel at:
strapi | http://localhost:1337/admin
```
<hr>

- **Configurar Strapi**
>Ingresar a Strapi con localhost si están corriendo Docker en Windows, o con la ip de la VM de Linux si están ejecutando Docker en una maquina virtual.

> Ejemplo con ip de VM:
```
http://192.168.1.96:1337/admin
```
>Una vez dentro de Strapi, en la columna PLUGINS, ingreso a '**Content-Types Builder**'.  
Luego a '**+ Create new Collection type**'.  
En '**Display name**' coloco '*lugar*' (nombre de nuestra colección de datos para guardar la info del clima).  
Agrego los campos que aparecen en el archivo '**datos-strapi.txt**'.

>Con todos los campos creados, ahora hay que crear el usuario autenticado que puede editar datos dentro de nuestro Strapi y con el cual el index.html se va a autenticar con el token correspondiente.  
Vamos a ir a la colección '**Users**', '**Add new user**' arriba a la derecha y agrego el usuario que esta en **datos-strapi.txt**.  
Luego ir a '**Roles & Permissions'**, entrar al rol '**Authenticated**' y abajo en '**Permissions**' seleccionar todos los permisos disponibles. Guardamos y Strapi esta listo para ser usado.
<hr>


- **Configurar app.js**
>Para que nuestro *index.html* se conecte con el Strapi que acabamos de configurar, debemos agregar la ip con la que ingresamos a Strapi a nuestro .js.  
Para ello, debemos abrir el *script.js* de la carpeta 'frontend' y reemplazar todos los **192.168.1.96** (que es mi ip) por la suya o en caso de que estén usando Windows, por localhost.
<hr>


- **Listo para usar** 
>Abrimos el index.html de la carpeta 'frontend' con su navegador de preferencia y ya estará funcionando nuestra app de Clima.

 ## Social
![Twitter Follow](https://img.shields.io/twitter/follow/lauticonte?style=social)  
![GitHub followers](https://img.shields.io/github/followers/lauticonte?style=social)

 ## End

