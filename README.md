# 🎯 Focus Timer - Pomodoro Offline

Una aplicación completa de Pomodoro para iOS y Android, **100% offline**, construida con React Native y Expo.

## ✨ Características

- ⏱️ **Temporizador Pomodoro** con ciclos personalizables
- 📊 **Estadísticas detalladas** con gráficas y logros
- 🎨 **Modo oscuro/claro** para trabajar en cualquier ambiente
- 🔔 **Notificaciones locales** cuando completas sesiones
- 💾 **100% Offline** - todos los datos se guardan localmente
- 💰 **Monetización con AdMob** (banners, interstitials, rewarded ads)
- 🎯 **Personalización completa** de tiempos y configuraciones
- 📱 **Diseño responsive** para iOS y Android

## 🚀 Instalación y Setup

### Requisitos previos

- Node.js 18 o superior
- npm o yarn
- Expo CLI
- Para iOS: macOS con Xcode
- Para Android: Android Studio

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd pomodoro-app

# Instalar dependencias
npm install

# Iniciar el proyecto
npm start
```

### Ejecutar en dispositivos

```bash
# iOS
npm run ios

# Android
npm run android

# Web (para testing)
npm run web
```

## 📱 Uso de Expo Go para Testing

1. Instala Expo Go en tu dispositivo móvil:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Ejecuta `npm start` en tu computadora

3. Escanea el QR code con tu dispositivo:
   - iOS: Usa la app de Cámara nativa
   - Android: Usa la app Expo Go

## 🎨 Estructura del Proyecto

```
pomodoro-app/
├── src/
│   ├── screens/           # Pantallas de la app
│   │   ├── Home/         # Temporizador principal
│   │   ├── Modes/        # Selección de modos
│   │   ├── Stats/        # Estadísticas
│   │   ├── Customization/ # Personalización
│   │   └── Settings/     # Ajustes
│   ├── components/       # Componentes reutilizables
│   ├── services/         # Lógica de negocio
│   │   ├── timerEngine.ts    # Motor del temporizador
│   │   ├── adsManager.ts     # Gestión de anuncios
│   │   ├── storage.ts        # Almacenamiento local
│   │   ├── notifications.ts  # Notificaciones
│   │   └── soundManager.ts   # Sonidos
│   ├── contexts/         # React Context (Theme, Timer)
│   ├── navigation/       # React Navigation
│   ├── types/           # TypeScript types
│   └── constants/       # Constantes y temas
├── assets/              # Iconos, sonidos, imágenes
└── App.tsx             # Punto de entrada
```

## 🔧 Configuración de AdMob

### 1. Obtener tus IDs de AdMob

1. Crea una cuenta en [Google AdMob](https://admob.google.com/)
2. Crea una app para iOS y otra para Android
3. Crea 3 unidades de anuncio:
   - Banner Ad
   - Interstitial Ad
   - Rewarded Ad

### 2. Configurar los IDs

Edita `src/constants/defaults.ts`:

```typescript
export const AD_UNIT_IDS = {
  BANNER: __DEV__
    ? 'ca-app-pub-3940256099942544/6300978111'  // Test ID
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY', // Tu ID real
  INTERSTITIAL: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712'
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  REWARDED: __DEV__
    ? 'ca-app-pub-3940256099942544/5224354917'
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
};
```

### 3. Configurar app.json

Reemplaza los IDs de prueba en `app.json`:

```json
{
  "plugins": [
    [
      "react-native-google-mobile-ads",
      {
        "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY",
        "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
      }
    ]
  ]
}
```

### 4. Google Services (Android)

Descarga `google-services.json` desde Firebase Console y reemplaza el archivo placeholder.

## 📋 Funcionalidades Principales

### 🏠 Pantalla Home
- Temporizador circular animado
- Control Start/Pause/Reset
- Cambio de color según el modo (Trabajo/Descanso)
- Banner publicitario

### 🔄 Pantalla Modos
- Visualización de ciclos completados
- Cambio rápido entre modos
- Información del método Pomodoro
- Indicadores visuales del modo activo

### 📊 Pantalla Estadísticas
- Total de sesiones completadas
- Tiempo total de trabajo y descanso
- Gráfica de actividad de los últimos 7 días
- Sistema de logros/achievements
- Racha de días consecutivos

### ⚙️ Pantalla Personalización
- Ajuste de duración de trabajo (5-60 min)
- Ajuste de descanso corto (1-15 min)
- Ajuste de descanso largo (10-45 min)
- Ciclos antes de descanso largo (2-8)
- Activar/desactivar sonidos
- Activar/desactivar vibración

### 🎨 Pantalla Ajustes
- Cambio de tema (claro/oscuro)
- Gestión de notificaciones
- Recordatorios automáticos
- Ver anuncios para apoyar la app
- Limpiar todos los datos
- Información de la app

## 💰 Sistema de Monetización

La app incluye tres tipos de anuncios:

1. **Banner Ads**: Se muestran en Home y Estadísticas
2. **Interstitial Ads**: Se muestran cada 5 sesiones completadas
3. **Rewarded Ads**: Disponibles en Ajustes para apoyar la app voluntariamente

## 🎯 Método Pomodoro

La técnica Pomodoro funciona así:

1. Trabaja enfocado durante 25 minutos (personalizable)
2. Toma un descanso de 5 minutos
3. Después de 4 ciclos, toma un descanso largo de 15 minutos
4. Repite el proceso

La app sigue este método automáticamente, cambiando entre modos de trabajo y descanso.

## 🔔 Notificaciones

La app usa notificaciones locales (no requiere servidor):

- Notificación al completar sesión de trabajo
- Notificación al completar descanso
- Recordatorios opcionales para iniciar nuevas sesiones

## 💾 Almacenamiento Local

Todos los datos se guardan localmente usando AsyncStorage:

- Configuración de la app
- Estadísticas de uso
- Historial de sesiones
- Logros desbloqueados

La app funciona 100% offline, sin necesidad de conexión a internet.

## 🏗️ Build para Producción

### iOS

```bash
# Crear build de desarrollo
expo build:ios

# O usar EAS Build (recomendado)
eas build --platform ios
```

### Android

```bash
# Crear APK
expo build:android -t apk

# O crear AAB para Play Store
expo build:android -t app-bundle

# O usar EAS Build (recomendado)
eas build --platform android
```

## 🐛 Troubleshooting

### Error de AdMob en desarrollo

Si ves errores de AdMob, asegúrate de que:
- Estás usando los Test IDs en modo desarrollo
- Has configurado correctamente google-services.json
- Has esperado unas horas después de crear las unidades de anuncio en AdMob

### Notificaciones no funcionan

- Verifica que has aceptado los permisos de notificaciones
- En iOS, las notificaciones locales requieren un dispositivo real (no funcionan en simulador)
- Asegúrate de que la opción está activada en Ajustes

### La app no compila

```bash
# Limpia caché y reinstala
rm -rf node_modules
npm install
expo start -c
```

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

Hecho con ❤️ usando React Native y Expo
