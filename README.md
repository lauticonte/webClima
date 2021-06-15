
# webClima

Aplicacion web que muestra el clima en las principales ciudades del mundo, las carga a Strapi (CMS que organiza y almacena datos) y dibuja graficos con la informacion guardada.


## Instalacion 

(Con Docker pre-instalado).

- Traer el repositorio de webClima
```
git clone https://github.com/lauticonte/webClima

```
- Instalar Strapi, mySQL y el backend.
```bash 
  cd webClima
  docker-compose up
```
Esperar que se instale todo y aparezca en la terminal:
```
To manage your project ?, go to the administration panel at:
strapi     | http://localhost:1337/admin
```
- Configurar Strapi
Ingresar a Strapi con localhost si estan corriendo Docker en Windows, o con la ip de la VM de Linux si estan ejecutando Docker en una maquina virtual.

Ejemplo con ip de VM:
```
http://192.168.1.96:1337/admin
```
Una vez dentro de Strapi, en la columna PLUGINS, ingreso a 'Content-Types Builder'.  
Luego a '+ Create new Collection type'.  
En 'Display name' coloco 'lugar' (nombre de nuestra coleccion de datos para guardar la info del clima).  
Agrego los campos que aparecen en el archivo 'datos-strapi.txt'.

Con todos los campos creados, ahora hay que crear el usuario autenticado que puede editar datos dentro de nuestro Strapi y con el cual el index.html se va a autenticar con el token correspondiente.  
Vamos a ir a la coleccion 'Users', 'Add new user' arriba a la derecha y agrego el usuario que esta en datos-strapi.txt.  
Luego ir a 'Roles & Permissions', entrar al rol 'Authenticated' y abajo en 'Permissions' seleccionar todos los permisos disponibles. Guardamos y Strapi esta listo para ser usado.

- Configurar app.js
Para que nuestro index.html se conecte con el Strapi que acabamos de configurar, debemos agregar la ip con la que ingresamos a Strapi a nuestro .js.  
Para ello, debemos abrir el script.js de la carpeta 'frontend' y reemplazar todos los 192.168.1.96 (que es mi ip) por la suya o en caso de que esten usando Windows, por localhost.

- Listo para usar 
Abrimos el index.html de la carpeta 'frontend' con su navegador de preferencia y ya estara funcionando nuestra app de Clima.

 