# Manual de inducción — Depósito y Logística · Logbelts

Sitio estático (HTML, CSS, SVG y un script chico, sin dependencias) para GitHub Pages.

- `index.html`: panorama general, tabla de tareas por puesto y etapa, entregas entre puestos, reglas, cierre diario y glosario.
- `valentina.html`: Encargada de depósito (11 procesos).
- `controlador.html`: Controlador de depósito (9 procesos, incluidos empaque y etiquetado).
- `picking.html`: Picking y armado (7 procesos, con tareas independientes agrupadas aparte).
- `assets/`: logo y diagramas. `estilos.css` y `app.js`: diseño y navegación.

Cada proceso tiene un resumen simple con secuencia ilustrada y un detalle a fondo desplegable. La página de la Encargada incluye síntesis de las diez grabaciones históricas junto a las tareas pertinentes: siete clips de apoyo se sirven desde `videos/` y tres grabaciones anteriores se conservan solo como resumen escrito. Los clips publicados conservan la resolución de pantalla original, sin audio, y tapan únicamente las zonas que muestran datos privados o importes. Se pueden abrir en grande desde cada tarjeta. Las síntesis no reemplazan el procedimiento vigente ni la práctica con tutor.

## Vista previa local

## Fotos de referencia del depósito

Se incorporaron 15 fotos de la carpeta aportada el 08/10/2026 en 15 tareas de las tres guías. Se omitió la segunda toma del sector de pedidos pendientes porque repite el mismo ejemplo. Los nombres originales y los encuadres se registran en `assets/deposito/encuadres.json`.

Los recortes se aplican en la presentación mediante SVG y un área de recorte explícita; las fotos originales se conservan sin reconstrucción ni retoque. El visor amplía el mismo encuadre y se cierra con el botón, Escape o el fondo. Estos recortes visuales no anonimizan el archivo original: la hoja completa permanece en el recurso local. Esta revisión está preparada para vista previa local.

## Servidor local

Desde esta carpeta, ejecutar `python -m http.server 8765 --bind 127.0.0.1` y abrir http://127.0.0.1:8765/. El servidor solo escucha en esta computadora.

El recorrido de portada tiene cinco etapas interactivas con definición, responsable, comprobación y enlace al procedimiento. Se abre una explicación por vez; se cierra con el mismo botón, la cruz, Escape o un clic afuera. En celular las etapas se apilan para facilitar el toque. Los accesos rápidos permiten ir a puestos, responsables, reglas, cierre y glosario.
