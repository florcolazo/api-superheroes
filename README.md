# Trabajo Práctico 5- Superhéroes SPA (Base de Datos NoSQL)

Este proyecto es una Single Page Application (SPA) para almacenar la información de los personajes de películas y cómics de Marvel y DC. 

## Tecnologías Utilizadas
- **Base de Datos**: MongoDB corriendo en contenedores con Docker.
- **Backend**: Node.js con Express y Mongoose.
- **Frontend**: React (creado con Vite) y CSS puro.

## Requisitos Previos
- Tener instalado [Node.js](https://nodejs.org/).
- Tener instalado [Docker](https://www.docker.com/) y Docker Compose.


### 1. Levantar la base de datos (MongoDB)
En la carpeta raíz del proyecto, ejecuta el siguiente comando para levantar el contenedor de Docker:
```bash
docker-compose up -d
```

### 2. Configurar e iniciar el Backend
Abre una terminal, entra a la carpeta `backend` e instala las dependencias:
```bash
cd backend
npm install
```
Luego, ejecuta el script  seed para cargar automáticamente los 40 superhéroes iniciales en la base de datos:
```bash
node seed.js
```
Finalmente, levanta el servidor backend:
```bash
node server.js
```
*(El backend quedará corriendo en `http://localhost:5000`)*

### 3. Configurar e iniciar el Frontend
Abre otra terminal, entra a la carpeta `frontend` e instala las dependencias:
```bash
cd frontend
npm install
```
Luego, levanta la aplicación de React:
```bash
npm run dev
```
El frontend quedará corriendo en `http://localhost:5173` 


