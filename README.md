# Federación de Levantamiento de Pesas de Nicaragua (FELEPNIC)

Sitio oficial de la Federación de Levantamiento de Pesas de Nicaragua (FELEPNIC). Aquí encontrarás información institucional, gestión de atletas, eventos, galería, contacto y panel de administración.

## Tecnologías utilizadas

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn-ui
- Supabase (autenticación y base de datos)
- React Router DOM
- TanStack React Query

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/) (v9 o superior recomendado)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <TU_URL_DEL_REPO>
   cd nica-pesas-web-main
   ```
2. Copia el archivo de ejemplo de variables de entorno y configura tus credenciales de Supabase:
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus datos reales de Supabase
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso en desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```
Abre tu navegador en [http://localhost:5173](http://localhost:5173) o la URL que indique la terminal.

## Scripts útiles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión optimizada para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter

## Estructura principal del proyecto

- `src/` — Código fuente principal (componentes, páginas, lógica)
- `public/` — Archivos públicos (favicon, imágenes, etc.)
- `dist/` — Carpeta generada al construir la app para producción

## Variables de entorno

Debes configurar el archivo `.env` con las siguientes variables:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## Despliegue

Puedes desplegar la aplicación en servicios como Vercel, Netlify o tu propio servidor. Solo necesitas construir la app con:
```bash
npm run build
```
Y servir el contenido de la carpeta `dist/`.

## Licencia

Este proyecto es propiedad de la Federación de Levantamiento de Pesas de Nicaragua. Uso interno y educativo.

## Contacto

- Federación de Levantamiento de Pesas de Nicaragua
- Email: [marcasnt@gmail.com]


---

> Desarrollado con ❤️ para la comunidad de levantamiento de pesas de Nicaragua.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/92bf62c2-1f71-4526-a884-a66318d99ae8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
