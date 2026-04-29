# Task Manager API 

REST API para gestión de tareas personales con autenticación JWT y base de datos PostgreSQL.

## Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

## Características

- Registro e inicio de sesión seguro con hashing de contraseñas (bcrypt)
- Autenticación stateless mediante JWT
- CRUD completo de tareas por usuario
- Cada usuario accede únicamente a sus propias tareas
- Base de datos relacional con PostgreSQL
- Tablas generadas automáticamente al iniciar el servidor

## Requisitos previos

- Node.js v18+
- Docker Desktop

## Instalación y uso

1. Clonar el repositorio
   git clone https://github.com/emanuelszevaga/task-manager-api.git
   cd task-manager-api

2. Copiar el archivo de variables de entorno
   cp .env.example .env
   (Completar los valores en el archivo .env)

3. Levantar la base de datos
   docker-compose up -d

4. Instalar dependencias
   npm install

5. Iniciar el servidor
   npm run dev

El servidor corre en http://localhost:3000

## Endpoints

### Auth

| Método | Endpoint             | Descripción          | Auth |
|--------|----------------------|----------------------|------|
| POST   | /api/auth/register   | Registrar usuario    | No   |
| POST   | /api/auth/login      | Iniciar sesión       | No   |

### Tasks

| Método | Endpoint          | Descripción               | Auth |
|--------|-------------------|---------------------------|------|
| GET    | /api/tasks        | Listar tareas del usuario | Sí   |
| GET    | /api/tasks/:id    | Obtener tarea por ID      | Sí   |
| POST   | /api/tasks        | Crear tarea               | Sí   |
| PUT    | /api/tasks/:id    | Editar tarea              | Sí   |
| DELETE | /api/tasks/:id    | Eliminar tarea            | Sí   |

Los endpoints protegidos requieren el header:
Authorization: Bearer <token>

### Ejemplos de request

**Registro**
POST /api/auth/register
{
  "email": "usuario@gmail.com",
  "password": "123456"
}

**Crear tarea**
POST /api/tasks
{
  "title": "Estudiar Node.js",
  "description": "Repasar middlewares y rutas"
}

**Editar estado**
PUT /api/tasks/1
{
  "status": "in_progress"
}

Los valores válidos para status son: pending | in_progress | done

## Estructura del proyecto

task-manager-api/
├── src/
│   ├── config/
│   │   └── db.js               # Conexión a PostgreSQL e inicialización de tablas
│   ├── controllers/
│   │   ├── auth.controller.js  # Lógica de registro y login
│   │   └── task.controller.js  # Lógica del CRUD de tareas
│   ├── middlewares/
│   │   └── auth.middleware.js  # Verificación de JWT
│   ├── routes/
│   │   ├── auth.routes.js      # Rutas de autenticación
│   │   └── task.routes.js      # Rutas de tareas
│   └── app.js                  # Servidor Express
├── .env.example                # Variables de entorno de ejemplo
├── .gitignore
├── docker-compose.yml          # Configuración de PostgreSQL con Docker
├── package.json                # Configuración principal del proyecto
├── package-lock.json           # Control exacto de versiones de dependencias
└── README.md                   # Documentación del proyecto