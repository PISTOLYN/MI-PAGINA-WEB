# MI-PAGINA-WEB

Página web adaptable para mostrar productos, videos, redes sociales, contacto por WhatsApp y un juego de memoria.

## Archivos
- `index.html`: estructura de la página.
- `styles.css`: diseño adaptable a celular, tablet y computadora.
- `app.js`: configuración de marca, productos, videos, redes, WhatsApp y juego.

## Personalizar
Abre `app.js` y modifica el objeto `CONFIG`:
- `brandName`: nombre de tu negocio.
- `whatsappNumber`: número con código de país, sin + ni espacios (México: 52 + número).
- `social`: enlaces de Facebook, TikTok, YouTube e Instagram.
- `products`: productos, categorías, descripciones, precios e imágenes.
- `videos`: videos de YouTube mediante su ID.

## Publicar gratis con GitHub Pages
1. Entra a Settings del repositorio.
2. Abre Pages en el menú lateral.
3. En Build and deployment selecciona **Deploy from a branch**.
4. Selecciona la rama **main** y la carpeta **/ (root)**.
5. Presiona Save.
6. Espera a que GitHub publique el sitio. La dirección será similar a:
   `https://pistolyn.github.io/MI-PAGINA-WEB/`

## Importante
GitHub Pages aloja archivos estáticos. El catálogo de esta primera versión se configura en `app.js`. Un panel administrativo que guarde cambios para todos los visitantes requiere conectar posteriormente una base de datos o servicio externo.