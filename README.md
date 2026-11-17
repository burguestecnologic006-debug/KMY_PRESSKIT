# KMY · Press Kit Web

Press kit oficial de **KMY** (Magic Sound Music) — sitio estático, responsive, listo para **GitHub Pages**. Sin build, sin dependencias.

## Estructura

```
index.html        → Press kit público (Bio, Discografía, Estadísticas, Redes, Streaming, Fotos, Videos, Contacto)
equipo.html       → Zona equipo (Dashboard de datos, Registro, Plan y calendario, Estrategia de comunidad) · noindex
css/styles.css    → Estilos por capas (tokens, base, layout, componentes, secciones, equipo, responsive)
js/data.js        → ⭐ TODO el contenido editable (bio, discografía, videos, redes, cifras públicas)
js/common.js      → Menú, scroll, animaciones, utilidades
js/app.js         → Lógica del press kit público
js/equipo.js      → Lógica de la zona equipo
images/           → logo, fotos y portadas
assets/           → PRESS_KIT_KMY.pdf (descargable)
```

## Publicar en GitHub Pages

1. Sube **todo el contenido** de esta carpeta a la raíz de tu repositorio `KMY_PRESSKIT` (en GitHub: *Add file → Upload files*, arrastra los archivos y carpetas → *Commit changes*). Reemplaza el README actual.
2. Ve a **Settings → Pages**.
3. En *Build and deployment* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** → *Save*.
4. En 1–2 minutos estará en: `https://TU-USUARIO.github.io/KMY_PRESSKIT/`
5. La zona equipo queda en `.../KMY_PRESSKIT/equipo.html`

> Todas las rutas son relativas, así que funciona en subcarpeta sin cambios.

## Cómo actualizar

| Quiero… | Edito… |
|---|---|
| Cambiar bio, hitos, contacto | `js/data.js` → `artist`, `contact` |
| Agregar un lanzamiento | `js/data.js` → `releases` (+ portada en `images/covers/`) |
| Enlace directo de Spotify/YouTube por canción | `releases[].spotify` / `.youtube` |
| Reproducir videos dentro del sitio | `videos[].id` = ID de YouTube (lo que va después de `watch?v=`) |
| Agregar redes del sello MSM | `social[]` → completa `url` de las 3 tarjetas “Magic Sound Music” |
| Agregar Apple Music, Deezer, Amazon | `streaming[]` → completa `url` |
| Cambiar cifras públicas | `js/data.js` → `publicStats` |
| Cambiar fotos | Reemplaza en `images/fotos/` y ajusta `photos` |

## Zona equipo

- **Dashboard**: KPIs con variación, gráfica de evolución por métrica, metas, ciudades y temas.
- **Registro de datos**: una “foto” semanal de Spotify, YouTube, IG, TikTok, FB, ciudades y temas. Exporta CSV y respaldo JSON.
- **Plan y calendario**: vistas Mes / Agenda / Año, tipos (lanzamiento, show, gira de medios, entrevista, contenido), estados, **plan de lanzamiento automático** (15 tareas) y exportación `.ics` para Google/Apple Calendar.
- **Estrategia de comunidad**: pilares, rutina semanal (se puede cargar al calendario), plataformas, embudo, KPIs y checklist.

Los datos del equipo se guardan **en el navegador (localStorage)**. Para llevarlos a otro dispositivo usa *Respaldo completo*. El sitio es público: no guardes información confidencial.
