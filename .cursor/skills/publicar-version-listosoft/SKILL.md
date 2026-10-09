---
name: publicar-version-listosoft
description: Publica una página de notas de versión de Listosoft ERP. Usar cuando el usuario pida una versión nueva, notas de versión, changelog, actualizar versiones/, o armar X.Y.Z.html.
---

# Publicar versión Listosoft

Leer [versiones/README.md](../../../versiones/README.md) y seguirlo al pie.

1. Copiar el HTML de la versión más reciente en `versiones/` (ej. `2.1.61.html`).
2. Sustituir número de versión, fechas, meta tags, canonical, breadcrumb y encabezado `H1` (con fecha no negrita al lado).
3. Distribuir cambios en las pestañas (`Destacado`, `Nuevo`, `Mejoras`, `Correcciones`) usando tarjetas directas sin iconos laterales (`.change-row`).
4. Actualizar contadores numéricos de cada pestaña (`.version-tab-count` y `aria-label`).
5. Insertar la entrada al inicio de `LISTOSOFT_VERSIONS` en `versiones.js`.
6. Poner `LATEST_VERSION_PATH` en `components.js` al archivo nuevo.
7. Omitir pestañas vacías.
8. No editar `styles.css` salvo que el usuario lo pida.
