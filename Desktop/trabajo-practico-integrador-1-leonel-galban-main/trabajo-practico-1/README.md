
# Trabajo Práctico Integrador I – Blog con Autenticación (Sequelize + MySQL)

Autor: **Leonel Galban**  
Tecnologías: **Node.js, Express, Sequelize, MySQL, JWT, bcrypt, cookies, express-validator**

Este proyecto implementa un sistema de gestión de blog personal con:

- Autenticación y autorización con JWT y cookies httpOnly.
- Hasheo de contraseñas con bcrypt.
- ORM Sequelize con MySQL.
- Relaciones:
  - 1:1 → User ↔ Profile
  - 1:N → User → Article
  - N:M → Article ↔ Tag (through: ArticleTag)
- Eliminación lógica (soft delete) con `paranoid: true` en User y Article.
- Eliminación en cascada de ArticleTag al borrar Article.
- Middlewares:
  - `authMiddleware` → verifica JWT desde cookie.
  - `adminMiddleware` → restringe acceso a admins.
  - `ownerMiddleware` → restringe acciones al dueño del recurso (o admin).
  - `validatorMiddleware` → maneja errores de express-validator.
- Validaciones con `express-validator` en las rutas.

## Instalación

```bash
npm install
cp .env.example .env   # o crearlo a mano y completar datos
```

Configurar `.env` con los datos de conexión a MySQL y el secreto JWT.

## Ejecución

```bash
npm run dev
```

Servidor por defecto en: `http://localhost:3000`.

## Endpoints principales

Ver rutas en:

- `src/routes/auth.routes.js`
- `src/routes/user.routes.js`
- `src/routes/tag.routes.js`
- `src/routes/article.routes.js`
- `src/routes/articleTag.routes.js`

Cumple con las consignas del Trabajo Práctico Integrador I.
