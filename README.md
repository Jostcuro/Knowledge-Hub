<p align="center">
  <img src="src/public/assets/genetic-data-svgrepo-com.svg" alt="Knowledge Hub Logo" width="80">
</p>

<h1 align="center">Knowledge Hub</h1>

<p align="center">
  <em>Plataforma de artículos tecnológicos para desarrolladores.</em><br>
  Explora contenido sobre Frontend, Backend, DevOps e Inteligencia Artificial con una interfaz moderna, modo oscuro y experiencia premium.
</p>

<p align="center">
  <a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.x-333333?style=for-the-badge&logo=express&logoColor=white" alt="Express"></a>
  <a href="https://www.mongodb.com/atlas"><img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas"></a>
  <a href="https://mongoosejs.com/"><img src="https://img.shields.io/badge/Mongoose-8.x-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"></a>
  <a href="https://ejs.co/"><img src="https://img.shields.io/badge/EJS-3.x-B72921?style=for-the-badge&logo=ejs&logoColor=white" alt="EJS"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-FFD43B?style=for-the-badge" alt="MIT License"></a>
</p>

---

## Capturas de pantalla

<!-- Reemplazar con capturas reales -->
| Home | Artículo | Dashboard |
|------|----------|-----------|
| ![Home](screenshots/home.png) | ![Post](screenshots/post.png) | ![Dashboard](screenshots/dashboard.png) |

---

## Características

- **Exploración de artículos** — Destacados, últimos artículos y por categoría
- **Búsqueda** — Por título, categoría y tags
- **Detalle de artículo** — Cover image, contenido, tiempo de lectura, vistas y artículos relacionados
- **Contador de vistas** — Cada apertura incrementa las vistas en MongoDB
- **Artículos relacionados** — Basados en categoría y coincidencia de tags
- **Comentarios** — Sistema de comentarios sin autenticación
- **Newsletter** — Formulario de suscripción
- **Dashboard de estadísticas** — Total artículos, vistas, más leído, categoría popular
- **Modo oscuro** — Toggle con persistencia en localStorage
- **Paginación** — Navegación paginada en el listado principal
- **Responsive** — Mobile-first, funciona en todos los dispositivos
- **SEO** — Meta tags, Open Graph, URLs amigables con slug

---

## Arquitectura

```
knowledge-hub/
├── src/
│   ├── controllers/     # Manejo de peticiones HTTP
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos (MongoDB)
│   ├── models/          # Schemas de Mongoose
│   ├── routes/          # Definición de rutas
│   ├── middleware/       # Middleware (errores, validación)
│   ├── config/          # Configuración y conexión a DB
│   ├── utils/           # Utilidades (seed script)
│   ├── public/          # Assets estáticos (CSS, JS)
│   ├── views/           # Templates EJS
│   └── app.js           # Configuración de Express
├── server.js            # Punto de entrada
├── .env.example         # Variables de entorno (ejemplo)
├── .gitignore
└── package.json
```

**Patrón arquitectónico:** Controller → Service → Repository → Database

Cada capa tiene una responsabilidad clara:
- **Controllers** reciben peticiones y delegan al service
- **Services** contienen la lógica de negocio
- **Repositories** abstraen las consultas a MongoDB
- **Models** definen el esquema y validaciones

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Base de datos | MongoDB Atlas |
| ODM | Mongoose |
| Template Engine | EJS |
| Seguridad | Helmet, Rate Limiting, Mongo Sanitize |
| Validación | Express Validator |
| Estilos | CSS custom properties + TailwindCSS CDN |

---

## Instalación

### Requisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) (o MongoDB local)
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/knowledge-hub.git
cd knowledge-hub

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu cadena de conexión de MongoDB Atlas

# 4. Sembrar datos de ejemplo
npm run seed

# 5. Iniciar el servidor
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

---

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `MONGODB_URI` | Cadena de conexión a MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/knowledge-hub` |

---

## Endpoints API

### Posts

| Método | Ruta | Descripción |
|--------|------|------------|
| GET | `/api/posts` | Listar artículos (paginado) |
| GET | `/api/posts/featured` | Artículos destacados |
| GET | `/api/posts/search?q=` | Buscar artículos |
| GET | `/api/posts/category/:category` | Artículos por categoría |
| GET | `/api/posts/:slug` | Detalle de artículo |
| GET | `/api/posts/:slug/related` | Artículos relacionados |

### Comments

| Método | Ruta | Descripción |
|--------|------|------------|
| GET | `/api/comments/:postId` | Comentarios de un artículo |
| POST | `/api/comments` | Crear comentario |

### Newsletter

| Método | Ruta | Descripción |
|--------|------|------------|
| POST | `/api/newsletter` | Suscribir email |

### Dashboard

| Método | Ruta | Descripción |
|--------|------|------------|
| GET | `/dashboard` | Estadísticas (vista HTML) |

---

## Modelo de Datos

### Post

```javascript
{
  title: String,        // requerido, máx 200 chars
  slug: String,         // único, auto-generado
  excerpt: String,      // requerido, máx 500 chars
  content: String,      // requerido (HTML)
  coverImage: String,   // URL de imagen
  author: String,       // requerido
  category: String,     // Frontend | Backend | DevOps | IA
  tags: [String],       // array de tags
  readingTime: Number,  // calculado automáticamente
  views: Number,        // default: 0
  featured: Boolean,    // default: false
  createdAt: Date,
  updatedAt: Date
}
```

### Comment

```javascript
{
  postId: ObjectId,     // ref: Post
  author: String,       // requerido, máx 100 chars
  content: String,      // requerido, máx 2000 chars
  createdAt: Date
}
```

### Subscriber

```javascript
{
  email: String,        // único, validado
  createdAt: Date
}
```

---

## Decisiones Arquitectónicas

### ¿Por qué Clean Architecture?

La separación en capas (Controller → Service → Repository) permite:
- **Testeabilidad** — Cada capa puede testearse de forma aislada
- **Mantenibilidad** — Los cambios en una capa no afectan a las demás
- **Reutilización** — Los services se pueden usar desde controllers o jobs
- **Escalabilidad** — Fácil de extender con nuevos endpoints o funcionalidades

### ¿Por qué EJS?

EJS fue elegido sobre alternativas como React/Vue porque:
- No requiere build step adicional
- Mejor SEO (contenido renderizado en servidor)
- Menor complejidad para un proyecto de portfolio
- Template injection para meta tags y SEO

### ¿Por qué Mongoose sobre MongoDB driver nativo?

- Validación de esquema integrada
- Middleware (hooks) para lógica pre/post save
- Poblar referencias entre colecciones
- Métodos de instancia y estáticos

---

## Posibles Mejoras

- [ ] Autenticación con JWT para roles admin/editor
- [ ] CMS interno para gestionar artículos desde la UI
- [ ] Búsqueda full-text avanzada con MongoDB Atlas Search
- [ ] Sistema de likes en artículos
- [ ] Caché con Redis para endpoints frecuentes
- [ ] Testing unitario y de integración (Jest + Supertest)
- [ ] CI/CD con GitHub Actions
- [ ] Despliegue en Render/Railway/Fly.io
- [ ] RSS feed
- [ ] Sitemap XML automático

---

## Licencia

MIT

---

## Autor

Desarrollado como proyecto de portafolio demostrando arquitectura backend, APIs REST y desarrollo full stack con Node.js.
