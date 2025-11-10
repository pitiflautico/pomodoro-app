# 🚀 Quick Start Guide

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar la app
npm start
```

## Probar en tu dispositivo móvil

### Opción 1: Usar Expo Go (Recomendado para pruebas)

1. **Instala Expo Go en tu teléfono:**
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Ejecuta el proyecto:**
   ```bash
   npm start
   ```

3. **Escanea el QR:**
   - iOS: Abre la app de Cámara y escanea el QR
   - Android: Abre Expo Go y escanea el QR

### Opción 2: Emulador/Simulador

```bash
# iOS (requiere macOS y Xcode)
npm run ios

# Android (requiere Android Studio)
npm run android
```

## Características Implementadas

- ✅ Temporizador Pomodoro con animación circular
- ✅ Sistema de modos (Trabajo, Descanso Corto, Descanso Largo)
- ✅ Estadísticas con gráficas
- ✅ Personalización completa de tiempos
- ✅ Tema oscuro/claro
- ✅ Notificaciones locales
- ✅ 100% Offline (AsyncStorage)
- ✅ AdMob integrado (banners, interstitials, rewarded)
- ✅ Sistema de logros
- ✅ Sonidos y vibración

## Estructura de Pantallas

1. **Home (Timer)** - Temporizador principal con control Start/Pause/Reset
2. **Modes** - Visualización y cambio de modos
3. **Stats** - Estadísticas, gráficas y logros
4. **Customize** - Ajustar duraciones y configuraciones
5. **Settings** - Tema, notificaciones, y opciones generales

## Configuración de AdMob (Opcional para testing)

Para testing, la app usa los Test IDs de Google AdMob. Para producción:

1. Crea una cuenta en https://admob.google.com
2. Crea tu app y obtén los Ad Unit IDs
3. Actualiza `src/constants/defaults.ts` con tus IDs reales
4. Actualiza `app.json` con tus App IDs
5. Reemplaza `google-services.json` con el tuyo desde Firebase Console

## Siguientes Pasos

### Para Development:
- La app funciona sin configuración adicional con IDs de prueba
- Los anuncios mostrarán "Test Ad" en modo desarrollo
- Todos los datos se guardan localmente en el dispositivo

### Para Production:
- Configura tus IDs de AdMob reales
- Reemplaza los assets (icon.png, splash.png, etc.)
- Ajusta los colores y estilos según tu marca en `src/constants/themes.ts`
- Build con Expo/EAS:
  ```bash
  # iOS
  eas build --platform ios

  # Android
  eas build --platform android
  ```

## Problemas Comunes

### "Cannot find module..."
```bash
npm install
```

### "Metro bundler stuck"
```bash
expo start -c
```

### "Ads not showing"
- Esto es normal en desarrollo inicial
- Espera unos minutos después de iniciar
- Los test ads pueden tardar en cargar

## Soporte

Para más información detallada, consulta [README.md](./README.md)
