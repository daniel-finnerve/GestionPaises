# Gestión de Países - Prototipos

Este repositorio contiene dos prototipos de interfaz para un sistema de gestión de países. El propósito principal es mostrar diferentes enfoques de diseño para un módulo de administración de listas maestras, específicamente para la gestión de países.

## Propósito

El objetivo de estos prototipos es evaluar diferentes experiencias de usuario para la gestión de países en el sistema Finnerve, permitiendo:

- Visualizar una lista de países existentes
- Añadir nuevos países al sistema
- Editar descripciones de países existentes
- Eliminar países (cuando está permitido)

## Versiones

### Versión 1 - Modal para añadir países

Esta versión implementa un enfoque tradicional donde:

- El formulario para añadir nuevos países aparece en un modal emergente
- Se accede al formulario mediante un botón "AÑADIR"
- Los campos del formulario (Nombre, Código, Descripción) se muestran todos juntos

**Ventajas:**

- Interfaz limpia que mantiene el foco en la lista de países
- Proceso de adición claramente separado de la visualización
- Experiencia familiar para usuarios de sistemas tradicionales

### Versión 2 - Formulario integrado

Esta versión implementa un enfoque más moderno donde:

- El formulario para añadir nuevos países está integrado directamente en la página
- Los campos del formulario están divididos en dos filas encima de la lista
- No requiere abrir/cerrar ventanas adicionales para añadir entradas

**Ventajas:**

- Interfaz más ágil que reduce clics necesarios para añadir elementos
- Visibilidad constante de todos los elementos de la interfaz
- Experiencia más fluida para usuarios frecuentes

## Características comunes

Ambas versiones ofrecen:

- Navegación por pestañas para diferentes categorías de listas maestras
- Visualización en formato de tabla para los países existentes
- Edición inline de descripciones (haciendo clic en la descripción)
- Confirmación de eliminación mediante modal
- Validación de restricciones de eliminación (algunos países no pueden eliminarse)

## Uso

1. Abra el archivo index.html en la raíz del proyecto
2. Seleccione la versión que desea visualizar
3. Interactúe con la interfaz según el prototipo seleccionado

## Implementación técnica

Los prototipos están construidos utilizando:

- HTML5
- CSS3
- JavaScript vanilla (sin frameworks)
- Datos de ejemplo precargados

## Próximos pasos

Después de evaluar estos prototipos, se seleccionará el enfoque más adecuado para implementar en la versión final del sistema, considerando la experiencia de usuario, la eficiencia operativa y la coherencia con el resto de la aplicación.
