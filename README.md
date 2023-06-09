# Fastify Modular Monolith

This is a demo project to show how to use Fastify with Typescript in a modular monolith architecture.

## Content
* [x] Fastify
* [x] Typescript
* [x] Tap
* [x] Swagger
* [x] DotEnv
* [x] Docker
* [x] Prisma
* [x] MariaDB
* [x] JWT

## Use Cases
* [x] Health Check
* [x] Signup a new user
* [x] Login
* [x] Get user info
* [x] Add some protected routes

### Signup a new user

```bash
curl -X POST \
  'http://localhost:8888/api/users/signup' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "jack",
  "password": "Password123",
  "firstname": "Jack",
  "lastname": "White",
  "email": "jack.white@email.com"
}'
```

### User Login

```bash
curl -X POST \
  'http://localhost:8888/api/users/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "jack",
  "password": "Password123"
}'
```

### Get user info

```bash
curl -X 'GET' \
  'http://localhost:8888/api/users/me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' 
```

### Get all Robots

```bash
curl -X 'GET' \
  'http://localhost:8888/api/robots' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' 
```