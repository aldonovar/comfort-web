# Guía de Activos (Imágenes y Video) para Proyectos

Para garantizar la mejor calidad visual y rendimiento en la web, por favor sigue estas especificaciones al exportar y subir el contenido.

## Estructura de Carpetas

Simplemente arrastra los archivos correspondientes a su carpeta:

- `/public/projects/el-polo/`
- `/public/projects/techo-led/`
- `/public/projects/luminaria-calida/`
- `/public/projects/damero/`

## Especificaciones Técnicas

### 1. Imagen Hero (Portada Principal)
Esta es la primera imagen que se ve a pantalla completa.
- **Resolución**: `1920 x 1080 px` (Landscape) ó `2560 x 1440 px` para pantallas retina.
- **Formato**: `.webp` (preferido) o `.jpg` (calidad 80-90%).
- **Peso Máximo**: `400kb - 600kb`.
- **Nombre sugerido**: `hero.jpg`

### 2. Galería de Fotos (Masonry Grid)
Las imágenes dentro del proyecto. Recomendamos una mezcla de formatos horizontales y verticales.

**Formato Vertical (Retrato)**
- **Resolución**: `1080 x 1350 px` (Relación 4:5)
- **Peso Máximo**: `250kb`.
- **Nombre sugerido**: `gallery-1.jpg`, `gallery-2.jpg`

**Formato Horizontal (Paisaje)**
- **Resolución**: `1920 x 1080 px` o `1200 x 800 px`.
- **Peso Máximo**: `250kb`.

### 3. Videos (Si aplica)
Si deseas reemplazar la imagen Hero por un video en loop.
- **Duración**: 10-20 segundos (bucle).
- **Resolución**: `1920 x 1080 px`.
- **Formato**: `.mp4` (Codec H.264).
- **Audio**: Muted (Sin audio).
- **Peso Máximo**: `5MB - 8MB` (CRÍTICO para la carga rápida).

## Requerimientos Específicos por Proyecto

### Terraza El Polo
**Ubicación**: `/public/projects/el-polo/`
1. **Video Reel**: `reel.mp4` (Video horizontal 16:9)
2. **Galería**: 8 imágenes nombradas `gallery-1.jpg` a `gallery-8.jpg`.
   - Mezcla de horizontales y verticales.
   - El código adapta el tamaño automáticamente.


## Herramientas Recomendadas
- **Conversión a WebP**: [Squoosh.app](https://squoosh.app/) (Google) o Photoshop Plugin.
- **Compresión de Video**: Handbrake.
