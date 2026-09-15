---
name: publicar-version-listosoft
description: Publica una página de notas de versión de Listosoft ERP. Usar cuando el usuario pida una versión nueva, notas de versión, changelog, actualizar versiones/, o armar X.Y.Z.html.
---

# Publicar versión Listosoft

Leer [versiones/README.md](../../../versiones/README.md) y seguirlo al pie.

1. Copiar el HTML de la versión más reciente en `versiones/`.
2. Sustituir número, fechas, meta, lead y cuerpo de cards (destacado, nuevo, mejoras, correcciones).
3. Insertar la entrada al inicio de `LISTOSOFT_VERSIONS` en `versiones.js`.
4. Poner `LATEST_VERSION_PATH` en `components.js` al archivo nuevo.
5. Omitir secciones vacías (y su link en «En esta página»).
6. No editar `styles.css` ni añadir capturas salvo que el usuario lo pida.
