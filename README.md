# Portfolio Matias Gutierrez

Portfolio Full Stack premium con panel admin, PostgreSQL y deploy pensado para Render.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL con `pg`
- Render Web Service + Render PostgreSQL

## Variables De Entorno

Crear estas variables en Render:

```env
DATABASE_URL=postgresql://...
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
AUTH_SECRET=...
```

`AUTH_SECRET` debe ser una cadena larga y aleatoria.

## Desarrollo Local

```bash
npm install
npm run dev
```

Si `DATABASE_URL` no existe, el portfolio muestra proyectos de ejemplo. Para crear, editar o eliminar proyectos desde `/admin`, PostgreSQL debe estar configurado.

## Deploy En Render

1. Crear un PostgreSQL en Render.
2. Crear un Web Service conectado al repo.
3. Build Command: `npm ci && npm run build`
4. Start Command: `npm run start`
5. Agregar las variables de entorno.
6. Abrir `/admin` para cargar proyectos.

Las portadas se guardan como base64 en PostgreSQL, sin servicios externos ni uso de tu PC como servidor.
