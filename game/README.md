# El Eco de las Alas

Experiencia narrativa lateral desarrollada con Phaser 4 y Vite. El jugador recorre cinco capítulos, acerca a Daryl Dixon a tres recuerdos por capítulo y avanza entre escenas sin combate ni puntuación.

## Requisitos

- Node.js 20 o posterior.
- npm.

## Instalación y desarrollo

Desde este directorio:

```bash
npm ci
npm run dev
```

Vite inicia un servidor local y sirve también la landing ubicada en la raíz del repositorio.

## Controles

- `A` o `Flecha izquierda`: moverse a la izquierda.
- `D` o `Flecha derecha`: moverse a la derecha.
- `E` o `Espacio`: abrir o cerrar un recuerdo.
- `M` o `Esc`: volver al menú de capítulos.

## Capítulos

1. Cicatrices y Silencio.
2. La Esperanza.
3. Cenizas y Canciones.
4. El Peso de los Fantasmas.
5. El Vuelo de las Alas.

Cada capítulo incluye tres recuerdos que modifican el ambiente y actualizan el progreso visible.

## Compilación y vista previa

```bash
npm run build
npm run preview
```

`npm run build` genera el sitio compilado en `dist/`. `npm run preview` permite revisar esa compilación antes de desplegarla.

## Subir a itch.io

1. Ejecuta `npm run build`.
2. Comprime el contenido de `dist/`, no la carpeta `dist/` completa: `index.html` y `assets/` deben estar en la raíz del ZIP.
3. En itch.io, crea o abre el proyecto y selecciona **HTML** como tipo de publicación.
4. Sube el ZIP en **Uploads** y activa **This file will be played in the browser**.
5. Selecciona **Embed in page** y usa aproximadamente `960 × 540` o una relación `16:9`.
6. Guarda y publica el proyecto.

Si itch.io bloquea las cargas por verificación de correo, puede usarse **Add External file** con la URL:

`https://2026b-sof-jueg-gr1.github.io/lita-ushina-alison-katiuska-jueg-gr1/game/`

## Estructura principal

- `src/main.js`: configuración de Phaser y registro de escenas.
- `src/scenes/`: escenas de arranque, carga, menú, juego y cierre.
- `src/*.jpg` y `src/*.png`: recursos visuales cargados por el juego.
- `vite.config.js`: ruta base y conexión con la landing de la raíz.
