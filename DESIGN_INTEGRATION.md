# 🎨 Guía de Integración de Diseños

Este archivo explica cómo integraré tus diseños en la aplicación.

## 📁 Carpeta de Diseños Esperada

Puedes subir tus diseños en cualquiera de estos formatos:
- Carpeta `design_style/` con imágenes o mockups
- Carpeta `designs/`
- Archivos Figma, Sketch, Adobe XD, o imágenes PNG/JPG

## 🎨 Qué Ajustaré Según tus Diseños

### 1. Colores
Actualizaré `src/constants/themes.ts` con:
- Colores principales (primary, secondary)
- Colores de fondo y cards
- Colores para cada modo del timer (trabajo/descanso)
- Colores de texto
- Colores de estados (error, success, warning)

### 2. Tipografía
- Familias de fuentes personalizadas
- Tamaños de fuente para títulos, subtítulos, texto
- Pesos de fuente (bold, semibold, regular)
- Altura de línea (line-height)
- Espaciado de letras (letter-spacing)

### 3. Espaciado y Layout
- Padding de contenedores
- Margins entre elementos
- Gap en listas y grids
- Altura de componentes
- Border radius (esquinas redondeadas)

### 4. Componentes Específicos

#### CircularProgress (Timer)
- Tamaño del círculo
- Grosor del borde
- Estilo de la animación
- Colores según el modo
- Sombras

#### Botones
- Tamaños (pequeño, mediano, grande)
- Border radius
- Colores de fondo y texto
- Sombras
- Estados (normal, pressed, disabled)

#### Cards
- Border radius
- Sombras
- Padding interno
- Colores de fondo
- Bordes

#### Bottom Navigation
- Iconos (puedo usar iconos personalizados o emoji)
- Colores activo/inactivo
- Altura de la barra
- Estilo de indicador

### 5. Pantallas Específicas

Para cada pantalla, ajustaré:
- Layout general
- Posición de elementos
- Tamaños y proporciones
- Espaciado específico
- Animaciones y transiciones

## 📋 Checklist de Diseños Recomendados

Sería ideal tener diseños de:
- [ ] Pantalla Home (Timer) - Estado idle, running, paused
- [ ] Pantalla Home - Diferentes modos (Work, Short Break, Long Break)
- [ ] Pantalla Modes - Vista general
- [ ] Pantalla Statistics - Con datos
- [ ] Pantalla Statistics - Sin datos
- [ ] Pantalla Customization - Vista de sliders
- [ ] Pantalla Settings
- [ ] Componentes individuales (botones, cards, etc.)
- [ ] Paleta de colores completa
- [ ] Especificaciones de tipografía
- [ ] Iconos personalizados (si los hay)

## 🎯 Proceso de Integración

Una vez que subas los diseños:

1. **Análisis**: Revisaré todos los archivos y extraeré:
   - Paleta de colores
   - Tipografía
   - Espaciados
   - Componentes

2. **Actualización de Constantes**:
   ```typescript
   // src/constants/themes.ts
   // Actualizaré con tus colores exactos

   // src/constants/defaults.ts
   // Ajustaré valores si es necesario
   ```

3. **Actualización de Componentes**:
   ```typescript
   // src/components/*.tsx
   // Ajustaré estilos de cada componente
   ```

4. **Actualización de Pantallas**:
   ```typescript
   // src/screens/*/*.tsx
   // Implementaré el layout exacto de cada pantalla
   ```

5. **Assets**:
   - Reemplazaré iconos placeholder
   - Añadiré fuentes personalizadas si las hay
   - Optimizaré imágenes

6. **Testing**:
   - Verificaré que todo se vea como en los diseños
   - Probaré en diferentes tamaños de pantalla
   - Comprobaré ambos temas (si hay diseño dark)

## 🖼️ Formato de Assets Recomendado

### Iconos
- Formato: PNG con fondo transparente o SVG
- Tamaños: @1x, @2x, @3x para mejor calidad
- Nombres descriptivos

### Fuentes
- Formato: TTF o OTF
- Incluir todas las variantes (regular, bold, etc.)

### Imágenes
- Formato: PNG para transparencias, JPG para fotos
- Optimizadas para móvil
- Tamaños apropiados (no más grandes de lo necesario)

## 🔧 Herramientas que Usaré

- **Medidas exactas**: Extraeré px, margins, paddings
- **Colores**: Códigos hex exactos
- **Fuentes**: Instalaré con expo-font si es necesario
- **Iconos**: Vector icons o custom SVG

## 📝 Notas Importantes

- **Responsive**: La app se adapta a diferentes tamaños de pantalla
- **Temas**: Si solo tienes diseño light, crearé el dark theme consistente
- **Accesibilidad**: Mantendré buen contraste y tamaños legibles
- **Performance**: Optimizaré para que siga siendo rápida

## 🚀 Tiempo Estimado

- Análisis de diseños: Inmediato
- Implementación básica: Rápido
- Ajustes finos: Según complejidad
- Testing: Para asegurar perfección

## 💬 Información Adicional

Si tienes:
- Guías de estilo específicas
- Especificaciones de diseño
- Referencias de apps similares
- Preferencias de animaciones

Compártelas y las implementaré exactamente como las necesitas.

---

**Estoy listo para integrar tus diseños en cuanto los subas!**
