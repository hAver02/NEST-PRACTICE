# 🚀 NestJS Senior Specialization

Repositorio de la especialización de nivel **Semi-Senior a Senior** en NestJS.

---

## 📌 Estructura del Repositorio

* **`modulo0/first-app/`**: Proyecto Nivelatorio CRUD de Tareas & Usuarios (DTOs, ValidationPipe, Pipes, Exceptions, Middlewares en 3 scopes y sub-recursos).
* **`modulo1/`**: *(En progreso)* Fundamentos Avanzados, IoC, Custom Providers, Dynamic Modules y Request Lifecycle.

---

## 🚀 Proyectos e Incrementos

### Módulo 0: Nivelación & Repaso Rápido
- [x] CLI & Estructura Modular (`TasksModule`, `UsersModule`)
- [x] Routing & Verbos HTTP (`@Get`, `@Post`, `@Patch`, `@Delete`, `@Query`, `@Param`, `@Body`, `@HttpCode`)
- [x] DTOs & ValidationPipe global (`whitelist`, `forbidNonWhitelisted`, `transform`)
- [x] Pipes nativos (`ParseUUIDPipe`)
- [x] Excepciones HTTP Semánticas (`NotFoundException`)
- [x] Relacionamiento Sub-recursos (`/users/:userId/tasks`)
- [x] Middlewares en los 3 Scopes (Global `LoggerMiddleware`, Controller `UsersAuditMiddleware`, Endpoint `DeleteTaskWarningMiddleware`)
