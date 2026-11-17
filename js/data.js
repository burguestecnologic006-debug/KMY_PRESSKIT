/* ==========================================================
   KMY · Press Kit — DATOS
   Este es el ÚNICO archivo que necesitas editar para actualizar
   el contenido público del press kit (bio, discografía, videos,
   estadísticas, redes, contacto).  Todo se pinta desde aquí.
   ========================================================== */
window.KMY = {

  /* ---------- Artista ---------- */
  artist: {
    name: "KMY",
    role: "Visual Artist",
    genre: "Reggaetón · Urbano",
    city: "Cali, Valle del Cauca · Colombia",
    born: "20 de abril de 1998",
    label: "Magic Sound Music (MSM)",
    tagline: "Desde la nave",
    heroPhoto: "images/fotos/kmy-hero.jpg",
    logo: "images/logo-msm.png",
    bio: [
      "KMY nació el 20 de abril de 1998 en Cali, Valle del Cauca. Es cantante, productor y autor colombiano con una propuesta que se mueve entre lo más underground y lo más comercial de la escena urbana: Rap, Trap, Reggaetón, Dancehall, Reggae, Disco, Pop y Synthwave conviven en un mismo universo sonoro.",
      "Con sólidas habilidades de canto y composición, ha construido una carrera en constante ascenso. Además de su trabajo como artista, es conocido por producir canciones para videojuegos, entre ellas “Trap De Amarella”, “Diana Siempre Gana” y “Who Is That Pokemon”.",
      "Su música nace en la escena de Cali y se amplifica con colaboraciones junto a Epidemic77, Zetaa, Kennan, Truko, El Mala Fama, XOXO EGO, ISAIAH, clvsis, Twocri y Misha Btc, entre otros. Cada lanzamiento viene acompañado de una dirección visual propia bajo el sello Magic Sound Music: videoclips, estética alien y un universo propio que él mismo bautiza “Desde la nave”."
    ],
    genres: ["Reggaetón", "Trap", "Rap", "Dancehall", "Reggae", "Disco", "Pop", "Synthwave"],
    collabs: ["Epidemic77", "Zetaa", "Kennan", "Truko", "El Mala Fama", "XOXO EGO", "ISAIAH", "clvsis", "Twocri", "Misha Btc", "Franko 24/7", "Daemon"],
    timeline: [
      { y: "1998", t: "Nace en Cali", d: "20 de abril, Valle del Cauca, Colombia." },
      { y: "2020", t: "Se abre el canal de YouTube", d: "El 4 de noviembre nace el canal @kmy420. Ese año sale “Del Ghetto”." },
      { y: "2021", t: "Celaje", d: "Participa en el álbum Celaje." },
      { y: "2023", t: "Call · Nueva Era", d: "Lanza “Call” junto a Epidemic77, Truko y El Mala Fama y aparece en el EP Nueva Era." },
      { y: "2024", t: "NTNGOUNAGLOCK · Pakistan · Entre Nos", d: "Año de posse cuts y colaboraciones: sus temas más escuchados en Spotify salen en este periodo." },
      { y: "2025", t: "Misyu", d: "Sencillo junto a clvsis." },
      { y: "2026", t: "Yonkou · Palmafiesta · La Cumbia Azucarera", d: "Perfil verificado por Spotify, Media Kit 2026 y nuevo lanzamiento: La Cumbia Azucarera." }
    ]
  },

  /* ---------- Contacto (booking / prensa) ---------- */
  contact: {
    email: "magicsound.musickmy@gmail.com",
    phone: "+57 319 204 9647",
    whatsapp: "573192049647",
    pdf: "assets/PRESS_KIT_KMY.pdf"
  },

  /* ---------- Redes sociales ---------- */
  social: [
    { id: "instagram", name: "Instagram", handle: "@kmy420", url: "https://www.instagram.com/kmy420" },
    { id: "tiktok", name: "TikTok", handle: "@kmyy420", url: "https://www.tiktok.com/@kmyy420" },
    { id: "youtube", name: "YouTube", handle: "@kmy420", url: "https://www.youtube.com/@kmy420" },
    { id: "facebook", name: "Facebook", handle: "kmy0420", url: "https://www.facebook.com/kmy0420" },
    { id: "spotify", name: "Spotify", handle: "KMY", url: "https://open.spotify.com/artist/0reseVsVM2PMFEBGjgMzRG" },
    /* Sello — completa las URLs cuando las tengas (si url está vacía, la tarjeta queda atenuada) */
    { id: "msm-instagram", name: "Magic Sound Music · Instagram", handle: "@msm.magic", url: "https://www.instagram.com/msm.magic" },
    { id: "msm-tiktok", name: "Magic Sound Music · TikTok", handle: "@magicsoundmusic", url: "https://www.tiktok.com/@magicsoundmusic" },
    { id: "msm-facebook", name: "Magic Sound Music · Facebook", handle: "Sello MSM", url: "" }
  ],

  /* ---------- Plataformas de streaming ---------- */
  streaming: [
    { id: "spotify", name: "Spotify", note: "Perfil verificado", url: "https://open.spotify.com/artist/0reseVsVM2PMFEBGjgMzRG" },
    { id: "youtube", name: "YouTube", note: "Canal oficial", url: "https://www.youtube.com/@kmy420" },
    { id: "youtubemusic", name: "YouTube Music", note: "Busca “KMY”", url: "https://music.youtube.com/search?q=kmy+420" },
    { id: "apple", name: "Apple Music", note: "Próximamente", url: "" },
    { id: "deezer", name: "Deezer", note: "Próximamente", url: "" },
    { id: "amazon", name: "Amazon Music", note: "Próximamente", url: "" }
  ],
  /* Reproductor embebido de Spotify */
  spotifyEmbed: "https://open.spotify.com/embed/artist/0reseVsVM2PMFEBGjgMzRG?utm_source=generator&theme=0",

  /* ---------- Discografía ----------
     kind: "propio" (lanzamiento como artista principal) | "colab" (aparece en)
     type: Sencillo | EP | Álbum
     spotify / youtube: pega aquí el enlace directo de cada lanzamiento cuando lo tengas   */
  releases: [
    { id: "la-cumbia-azucarera", title: "La Cumbia Azucarera", year: 2026, type: "Sencillo", kind: "propio", artists: "KMY", cover: "images/covers/la-cumbia-azucarera.jpg", note: "Último lanzamiento", spotify: "", youtube: "" },
    { id: "yonkou", title: "Yonkou", year: 2026, type: "Sencillo", kind: "propio", artists: "KMY, ISAIAH", cover: "", note: "Videoclip oficial · MSM", spotify: "", youtube: "" },
    { id: "palmafiesta", title: "Palmafiesta", year: 2026, type: "Sencillo", kind: "colab", artists: "Arte y Cultura Colombia ft. KMY", cover: "images/covers/palmafiesta.jpg", note: "", spotify: "", youtube: "" },
    { id: "misyu", title: "Misyu", year: 2025, type: "Sencillo", kind: "propio", artists: "KMY, clvsis", cover: "", note: "", spotify: "", youtube: "" },
    { id: "ntngounaglock", title: "NTNGOUNAGLOCK", year: 2024, type: "Sencillo", kind: "propio", artists: "Indica Notario, KMY, XOXO EGO, QUIMITRAP, ZETAA y más", cover: "images/covers/ntngounaglock.jpg", note: "Posse cut · 6:21", spotify: "", youtube: "" },
    { id: "pakistan", title: "Pakistan", year: 2024, type: "Sencillo", kind: "propio", artists: "KMY, XOXO EGO, lil, jerry", cover: "images/covers/pakistan.jpg", note: "Tema más escuchado en Spotify", spotify: "", youtube: "" },
    { id: "entre-nos", title: "Entre Nos", year: 2024, type: "Sencillo", kind: "propio", artists: "ZETAA, Epidemic77, KMY, Drkko", cover: "images/covers/entre-nos.jpg", note: "", spotify: "", youtube: "" },
    { id: "time", title: "Time", year: 2024, type: "Sencillo", kind: "colab", artists: "KMY (feat.)", cover: "images/covers/time.jpg", note: "", spotify: "", youtube: "" },
    { id: "call", title: "Call", year: 2023, type: "Sencillo", kind: "propio", artists: "KMY, Epidemic77, Truko, El Mala Fama", cover: "images/covers/call.jpg", note: "Videoclip oficial", spotify: "", youtube: "" },
    { id: "nueva-era", title: "Nueva Era", year: 2023, type: "EP", kind: "colab", artists: "Varios artistas (aparece KMY)", cover: "images/covers/nueva-era.jpg", note: "", spotify: "", youtube: "" },
    { id: "celaje", title: "Celaje", year: 2021, type: "Álbum", kind: "colab", artists: "Varios artistas (aparece KMY)", cover: "images/covers/celaje.jpg", note: "", spotify: "", youtube: "" },
    { id: "del-ghetto", title: "Del Ghetto", year: 2020, type: "Sencillo", kind: "colab", artists: "KMY, Truko, Pirlo, Zeta, Kennan", cover: "images/covers/del-ghetto.jpg", note: "", spotify: "", youtube: "" }
  ],

  /* ---------- Videos (YouTube) ----------
     id: pega el ID de 11 caracteres de YouTube (lo que va después de watch?v=)
     Con id → se reproduce dentro del press kit.  Sin id → abre la búsqueda en YouTube. */
  videos: [
    { title: "Efecto", artists: "KMY ft. Riki13, CHENKYD, Drkko", views: "", age: "", cat: "reciente", id: "vXA6Kas_nHI" },
    { title: "Luce", artists: "KMY", views: "237", age: "hace 3 meses", cat: "reciente", id: "e_dWgsKTfRg" },
    { title: "BB", artists: "KMY x Twocri", views: "850", age: "hace 5 meses", cat: "reciente", id: "-xHJ4mRvDRM" },
    { title: "Yonkou", artists: "KMY x ISAIAH", views: "876", age: "hace 7 meses", cat: "reciente", id: "PAc6x2ZWfVc" },
    { title: "Qlito", artists: "KMY, clvsis", views: "1.6 K", age: "hace 1 año", cat: "reciente", id: "GhbVTdtN3io" },
    { title: "UuuMAMA 4K", artists: "KMY", views: "731", age: "hace 1 año", cat: "reciente", id: "" },
    { title: "Fino y Elegante 4K", artists: "KMY", views: "1.8 K", age: "hace 1 año", cat: "reciente", id: "" },
    { title: "Maldito Flow", artists: "KMY, Epidemic77, Zetaa, Kennan y más", views: "33 K", age: "hace 3 años", cat: "popular", id: "" },
    { title: "Bellakeo", artists: "KMY, Zetaa, Kennan", views: "17 K", age: "hace 5 años", cat: "popular", id: "" },
    { title: "Cali", artists: "KMY, Epidemic77, Zetaa, Kennan, Daemon", views: "15 K", age: "hace 3 años", cat: "popular", id: "" },
    { title: "Call", artists: "KMY, Epidemic77, El Mala Fama, Truko", views: "14 K", age: "hace 3 años", cat: "popular", id: "" },
    { title: "Brujería", artists: "KMY", views: "8.5 K", age: "hace 5 años", cat: "popular", id: "" },
    { title: "Conexión", artists: "KMY, Misha Btc", views: "5.6 K", age: "hace 4 años", cat: "popular", id: "" }
  ],

  /* ---------- Próximos shows (se muestran en el press kit; quita los pasados cuando quieras) ---------- */
  shows: [
    { date: "2026-11-15", title: "Perreo de Contrabando", venue: "Bajo Cero Disco Bar", city: "Cali, Valle del Cauca", address: "Cra 66 #10-92, Limonar",
      flyer: "images/shows/perreo-contrabando.jpg",
      info: "Cover $15K · Mujeres sin cover hasta las 11 pm. Invitados: Macht, KMY x Army · DJ Will en vivo.",
      contact: "314 811 9592" }
  ],

  /* Eventos que se cargan por primera vez en el calendario del equipo */
  seedEvents: [
    { id: "seed-perreo-2026-11-15", title: "Show · Perreo de Contrabando (Bajo Cero)", type: "show", status: "confirmado", date: "2026-11-15", time: "",
      place: "Bajo Cero Disco Bar, Cra 66 #10-92, Limonar, Cali",
      notes: "Cover $15K; mujeres sin cover hasta las 11 pm. Invitados Macht, KMY x Army; DJ Will. Info y reservas 314 811 9592. Pendiente: hora de salida a tarima." }
  ],

  /* ---------- Fotos ---------- */
  photos: [
    { src: "images/fotos/kmy-02.jpg", alt: "KMY con luces de neón" },
    { src: "images/fotos/kmy-03.jpg", alt: "KMY sentado sobre un carro" },
    { src: "images/fotos/kmy-01.jpg", alt: "KMY dentro del carro" },
    { src: "images/fotos/kmy-hero.jpg", alt: "KMY retrato del media kit 2026" }
  ],

  /* ---------- Estadísticas públicas (se muestran en el press kit) ----------
     Fuente: capturas de Spotify y YouTube del 14-nov-2026.  Actualiza cuando quieras. */
  publicStats: {
    updated: "14 nov 2026",
    spotify: { monthlyListeners: 437, followers: 2256 },
    youtube: { subs: 813, views: 170961, videos: 27, joined: "4 nov 2020" },
    instagram: { followers: 3369 },
    tiktok: { followers: 644, likes: 6859 },
    streams30d: 1000,
    cities: [
      ["Bogotá, CO", 50], ["Cali, CO", 49], ["Medellín, CO", 19], ["Santiago, CL", 11], ["Guayaquil, EC", 11]
    ],
    topTracks: [
      ["Pakistan", 22052], ["Entre Nos", 15719], ["Call", 14869], ["NTNGOUNAGLOCK", 11605]
    ],
    /* Referencia del Media Kit PDF 2026 (versión anterior) */
    pdfReference: {
      label: "Media Kit PDF 2026",
      spotify: { monthlyListeners: 60329, followers: 2071 },
      youtube: { subs: 784, views: 146624 },
      cities: [["Bogotá, CO", 14041], ["Medellín, CO", 9557], ["Cali, CO", 7475], ["Barranquilla, CO", 3338], ["Bucaramanga, CO", 1437]]
    }
  },

  /* ==========================================================
     ZONA EQUIPO  (equipo.html)
     ========================================================== */

  /* Métricas que se registran en el dashboard */
  metrics: [
    { key: "monthlyListeners", label: "Oyentes mensuales (Spotify)", short: "Oyentes mensuales", color: "#c6ff00" },
    { key: "spotifyFollowers", label: "Seguidores en Spotify", short: "Seguidores Spotify", color: "#3ddc84" },
    { key: "streams7d", label: "Streams últimos 7 días", short: "Streams 7 d", color: "#36d6ff" },
    { key: "streams28d", label: "Streams últimos 28 días", short: "Streams 28 d", color: "#8b6bff" },
    { key: "ytSubs", label: "Suscriptores de YouTube", short: "Suscriptores YT", color: "#ff3d3d" },
    { key: "ytViews", label: "Vistas totales de YouTube", short: "Vistas YT", color: "#ff6a3d" },
    { key: "igFollowers", label: "Seguidores de Instagram", short: "Seguidores IG", color: "#ff3d9a" },
    { key: "ttFollowers", label: "Seguidores de TikTok", short: "Seguidores TikTok", color: "#36d6ff" },
    { key: "fbFollowers", label: "Seguidores de Facebook", short: "Seguidores FB", color: "#5b8cff" },
    { key: "community", label: "Miembros de la comunidad (WhatsApp / Telegram)", short: "Comunidad propia", color: "#ffb020" }
  ],

  /* Foto inicial de datos (se carga la primera vez; luego manda lo que registres) */
  snapshots: [
    {
      date: "2026-11-14", monthlyListeners: 437, spotifyFollowers: 2256, streams7d: 250, streams28d: 1000,
      ytSubs: 813, ytViews: 170961, igFollowers: 3369, ttFollowers: 644, fbFollowers: null, community: null,
      cities: "Bogotá, CO: 50\nCali, CO: 49\nMedellín, CO: 19\nSantiago, CL: 11\nGuayaquil, EC: 11",
      tracks: "Pakistan: 22052\nEntre Nos: 15719\nCall: 14869\nNTNGOUNAGLOCK: 11605",
      note: "Capturas Spotify + YouTube; IG y TikTok informados por el equipo. Streams = últimos ~30 días. Sin página de Facebook por ahora."
    }
  ],

  /* Metas sugeridas a 90 días (editables en el dashboard) */
  goals: {
    monthlyListeners: 2500, spotifyFollowers: 3500, ytSubs: 1500,
    igFollowers: 3000, ttFollowers: 3000, community: 300
  },

  /* Tipos y estados del planificador */
  eventTypes: [
    { key: "lanzamiento", label: "Lanzamiento", color: "#c6ff00" },
    { key: "show", label: "Show / Concierto", color: "#ff6a3d" },
    { key: "prensa", label: "Gira de medios", color: "#36d6ff" },
    { key: "entrevista", label: "Entrevista", color: "#ff3d9a" },
    { key: "contenido", label: "Contenido / Video", color: "#8b6bff" },
    { key: "otro", label: "Otro / Reunión", color: "#8a8a92" }
  ],
  eventStatus: ["idea", "planeado", "confirmado", "hecho"],

  /* Plantilla de plan de lanzamiento (días relativos a la fecha de salida) */
  rollout: [
    { d: -42, type: "contenido", t: "Canción cerrada: mezcla y master aprobados" },
    { d: -35, type: "lanzamiento", t: "Entregar a la distribuidora (mínimo 4 semanas antes)" },
    { d: -28, type: "contenido", t: "Definir portada, concepto visual y plan de contenido del lanzamiento" },
    { d: -21, type: "lanzamiento", t: "Activar pre-save y link único (Linktree / landing)" },
    { d: -21, type: "contenido", t: "Jornada de grabación de teasers (varios clips en un día)" },
    { d: -14, type: "contenido", t: "Empiezan los teasers: TikTok, Reels y Shorts con el snippet" },
    { d: -10, type: "prensa", t: "Enviar a curadores independientes, DJs y medios locales" },
    { d: -7, type: "lanzamiento", t: "Pitch editorial en Spotify for Artists (máx. antes del día de salida)" },
    { d: -3, type: "contenido", t: "Anuncio “sale el viernes”: historias + Close Friends con avance" },
    { d: -1, type: "contenido", t: "Cuenta regresiva y recordatorio de pre-save" },
    { d: 0, type: "lanzamiento", t: "DÍA DE LANZAMIENTO: salida + estreno de video + Live en Instagram" },
    { d: 1, type: "contenido", t: "Agradecer y republicar contenido de fans (UGC)" },
    { d: 3, type: "contenido", t: "Shorts/Reels con escenas del videoclip" },
    { d: 7, type: "otro", t: "Primer análisis: registrar métricas en el dashboard" },
    { d: 14, type: "otro", t: "Cierre del lanzamiento: aprendizajes y siguiente paso" }
  ],

  /* ---------- Estrategia de comunidad orgánica ---------- */
  strategy: {
    diagnostico: [
      "Tu audiencia en Spotify (≈2.2 K seguidores) es mucho más grande que tus oyentes mensuales (≈437): hay gente que te sigue pero no te escucha cada mes. La prioridad no es “más seguidores”, es convertir seguidores en oyentes recurrentes.",
      "Tus videos con colaboraciones (Maldito Flow 33 K, Bellakeo 17 K, Cali 15 K, Call 14 K) rinden mucho más que los sencillos solistas recientes (200–1.8 K). Las colabs son tu mayor palanca de alcance.",
      "Tus ciudades fuertes son Bogotá, Cali y Medellín, con presencia emergente en Chile y Ecuador: ahí se debe concentrar contenido, geolocalización y shows.",
      "Tienes un universo propio (estética alien, “Desde la nave”, sello MSM). Eso es lo que convierte a oyentes en comunidad: una identidad con nombre."
    ],
    concepto: {
      nombre: "La Nave (propuesta)",
      texto: "Convierte “Desde la nave” en el nombre de la comunidad: los fans son la tripulación. Un nombre compartido crea pertenencia, da pie a rituales (saludos, códigos, retos) y hace que la gente quiera sumarse. Es una propuesta: si prefieres otro nombre, el mecanismo funciona igual."
    },
    pilares: [
      { n: "01", t: "Proceso y estudio", c: "#c6ff00", items: ["Detrás de cámaras de grabación, mezcla y producción (eres también productor: aprovéchalo).", "“Cómo hice este beat/hook” en 20–30 s.", "Letras a medias, versiones descartadas, errores graciosos."] },
      { n: "02", t: "Música y hooks", c: "#36d6ff", items: ["El estribillo o el mejor momento de cada tema en los primeros 2 segundos.", "Mismo audio en TikTok, Reels y Shorts para sumar usos del sonido.", "Versiones acústicas, slowed o a cappella para variar."] },
      { n: "03", t: "Cultura Cali / Colombia", c: "#ff6a3d", items: ["Barrio, humor, jerga, cumbia, salsa choke y cómo se mezcla con tu sonido.", "Lugares reales de Cali, Medellín y Bogotá (geolocaliza).", "Referencias locales que la gente quiera compartir."] },
      { n: "04", t: "Comunidad y fans", c: "#ff3d9a", items: ["Responder comentarios con video, duetos y stitches.", "Reto o reto de baile/lip-sync con un fragmento del tema.", "Fan del mes, republicar historias de fans, mensajes de voz."] },
      { n: "05", t: "Colabs y escena", c: "#8b6bff", items: ["Contenido cruzado con Epidemic77, Zetaa, Kennan, Truko, ISAIAH, clvsis…", "Lives conjuntos en Instagram (llegas a la audiencia del otro).", "Mostrar la escena: ensayos, sesiones, freestyles."] }
    ],
    semana: [
      ["Lun", "Planear la semana + responder DMs y comentarios (30 min)"],
      ["Mar", "TikTok/Reel: proceso de estudio o beat"],
      ["Mié", "Short/Reel: hook del tema + invitar a guardar/compartir"],
      ["Jue", "Historia con encuesta o caja de preguntas + mensaje a la comunidad"],
      ["Vie", "Día de lanzamiento / contenido fuerte (clip del video o colab)"],
      ["Sáb", "Live corto en Instagram o TikTok, o contenido de calle/cultura"],
      ["Dom", "Análisis: registrar métricas en el dashboard (30 min) y ajustar"]
    ],
    plataformas: [
      { t: "TikTok", s: "Descubrimiento", items: ["4–5 videos por semana; hook en los primeros 2 s.", "Usa tu audio original en cada video para que otros lo reutilicen.", "Duetos/stitches con creadores del nicho urbano colombiano.", "Comenta a diario en 10 cuentas de tu nicho (con aportes, no spam)."] },
      { t: "Instagram", s: "Cercanía", items: ["3 Reels por semana + historias diarias.", "Encuestas, cajas de preguntas y “Close Friends” para la tripulación.", "Lives conjuntos con artistas con los que colaboras.", "Colabora en publicaciones (Collab) con productores, videógrafos y artistas."] },
      { t: "YouTube", s: "Profundidad", items: ["Cada videoclip → 3 a 5 Shorts con escenas distintas.", "Pestaña de Comunidad: avances, encuestas, portadas.", "Títulos y miniaturas consistentes (marca MSM).", "Agrega playlists por tema/colab para que se escuche seguido."] },
      { t: "Spotify", s: "Conversión", items: ["Perfil al día: foto, banner, bio, “Artist Pick”.", "Pre-save y enlaces de seguimiento en todas las bios y videos.", "Playlist propia “Desde la nave” con tus temas y los de tu escena.", "Pitch en Spotify for Artists en cada lanzamiento."] },
      { t: "WhatsApp / Telegram", s: "Audiencia propia", items: ["Un canal de difusión: avisos de lanzamientos y contenido exclusivo.", "No dependes del algoritmo: es tu base de fans más fiel.", "Meta inicial: 300 miembros; invita desde historias y Lives."] },
      { t: "Facebook", s: "Local y colabs", items: ["Comparte videoclips en grupos locales de música urbana.", "Eventos para shows y fechas de lanzamiento.", "Reutiliza Reels para llegar a un público de otras edades."] }
    ],
    embudo: [
      ["1 · Descubrir", "TikTok, Reels y Shorts con hooks y colabs"],
      ["2 · Seguir", "Instagram y Spotify: una sola llamada a la acción por pieza"],
      ["3 · Escuchar", "Spotify y YouTube: playlist propia, pre-save y enlaces claros"],
      ["4 · Pertenecer", "Canal de WhatsApp, Close Friends, retos y nombre de comunidad"],
      ["5 · Apoyar", "Asistir a shows, compartir, comprar merch, traer a otros"]
    ],
    tacticas: [
      "Colaboración cruzada: cada lanzamiento incluye un Live o dueto con alguien de la escena.",
      "Shows pequeños con QR visible hacia tu perfil de Spotify y canal de WhatsApp.",
      "Micro-influencers y DJs locales: envíales el tema antes, con contenido listo para usar.",
      "Playlists independientes y curadores locales: contacto personal, nunca spam masivo.",
      "Retos con el hook de un tema y premio simbólico (shout-out, merch, aparición en historia).",
      "Geolocaliza y usa hashtags de Cali, Medellín y Bogotá en tus publicaciones.",
      "Reutiliza cada pieza: 1 videoclip = 5 Shorts, 3 Reels, 3 historias, 1 clip vertical para TikTok.",
      "Sube contenido de tus discos pasados en cada nuevo lanzamiento (“Throwback Thursday” con el tema que más suena)."
    ],
    evitar: [
      "Comprar seguidores, reproducciones o playlists falsas: Spotify penaliza y puede retirar el catálogo.",
      "Más de una llamada a la acción por publicación.",
      "Publicar sin responder comentarios: la comunidad se construye en la conversación.",
      "Medir solo seguidores: mira guardados, compartidos, tiempo de reproducción y conversión a oyentes."
    ],
    kpis: [
      { t: "Conversión seguidor → oyente", d: "Oyentes mensuales ÷ seguidores de Spotify. Hoy ≈ 19 %. Meta: superar 50 %." },
      { t: "Guardados y compartidos", d: "En Reels y TikTok pesan más que los “me gusta”." },
      { t: "Crecimiento semanal", d: "+3–5 % semanal en oyentes mensuales y seguidores de TikTok/Instagram." },
      { t: "Ciudades", d: "Ver subir Bogotá, Cali y Medellín; abrir una ciudad nueva por trimestre." },
      { t: "Comunidad propia", d: "Miembros del canal de WhatsApp/Telegram y su tasa de respuesta." }
    ],
    checklist: [
      "Perfil completo en Spotify, YouTube, Instagram, TikTok y Facebook (misma foto y bio)",
      "Enlace único (Linktree o este press kit) en todas las bios",
      "Crear canal de difusión de WhatsApp y dar nombre a la comunidad",
      "Crear la playlist “Desde la nave” en Spotify",
      "Definir 5 pilares de contenido y banco de 20 ideas",
      "Agendar la primera jornada de grabación en lote (10+ clips)",
      "Rutina de 10 comentarios diarios en cuentas del nicho",
      "Primer Live conjunto con un artista de la escena",
      "Configurar pre-save para el próximo lanzamiento",
      "Registrar métricas todos los domingos en el dashboard",
      "Cargar en el calendario los lanzamientos del primer trimestre",
      "Revisar el mes: qué contenido funcionó y repetirlo"
    ]
  }
};
