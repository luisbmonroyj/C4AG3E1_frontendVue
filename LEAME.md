# frontend en vue NodeJS

## Se debe usar la version 16 o superior de NodeJS

## instalar el paquete de CLI

npm install -g @vue/cli

- se puede quitar el parametro -g pero en la carpeta del proyecto

## si se importa el repositorio, no se debe crear el proyecto, solo instalar los componentes
-Es posible que se necesite una terminal con permisos de administrador

npm install

## creacion del proyecto (opcional)

vue create <proyecto>

- manually select features  
    - manually select version (optional)
    - Babel
    - Router   
- version 3.x
- Use history mode for router? No
- Where do you prefer placing config for Babel, ESLint, etc.? In package.json
- Save this as a preset for future projects? No

## Para correr el servidor, la terminal debe estar en la carpeta <proyecto>

- npm run serve

## Para detener el servidor

- Ctrl + C

## Para cambiar el puerto de salida del servicio
- cambiar el archivo vue.config.json con las siguientes lineas

'const { defineConfig } = require('@vue/cli-service')'
'module.exports = {devServer: {  port: 3454 \}\}'

