# ESP32 ToF IoT Dashboard

Dashboard en tiempo real para la visualización de telemetría de sensores ToF (Time of Flight) y ambientales utilizando un microcontrolador ESP32-S3.

## Características Principales
* **Monitoreo en tiempo real**: Visualización de datos de sensores (Temperatura, Humedad, Conteo de personas).
* **Integración Cloud**: Comunicación directa con Google Firestore para persistencia y sincronización de datos.
* **Interfaz Responsiva**: Construida con React y Material UI para adaptarse a cualquier dispositivo.
* **Visualización de Datos**: Gráficas dinámicas e interactivas implementadas con Chart.js.
* **Despliegue Automatizado**: Configurado para publicarse fácilmente en GitHub Pages.

## Tecnologías Utilizadas
* **Frontend**: React 19, Vite, Material UI (MUI).
* **Gráficos**: Chart.js, react-chartjs-2.
* **Backend/BaaS**: Firebase (Firestore).
* **Hardware Relacionado**: ESP32-S3, Sensor VL53L5CX (ToF).

## Requisitos Previos
* Node.js instalado (v18 o superior recomendado).
* Proyecto configurado en Firebase con una base de datos Firestore activa.
* Dispositivo ESP32 configurado para publicar telemetría en Firestore.

## Instalación y Ejecución Local

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Construir la versión de producción:
   ```bash
   npm run build
   ```

## Despliegue en GitHub Pages

El proyecto incluye un script para compilar y desplegar automáticamente en GitHub Pages.

1. Asegúrate de haber configurado tu repositorio remoto.
2. Ejecuta el comando de despliegue:
   ```bash
   npm run deploy
   ```
3. Activa GitHub Pages en la configuración del repositorio seleccionando la rama `gh-pages`.
