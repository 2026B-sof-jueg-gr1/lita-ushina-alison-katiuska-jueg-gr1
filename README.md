# El Eco de las Alas

Proyecto web compuesto por una landing page estática y un videojuego narrativo construido con Phaser 4 y Vite.

## Contenido

- [`index.html`](./index.html): página principal y acceso al juego.
- [`game/`](./game/): aplicación de Phaser con cinco capítulos narrativos.
- [`docs/GDD.md`](./docs/GDD.md): alcance y documento de diseño del juego.

## Ejecutar localmente

Requisitos: Node.js 20 o posterior y npm.

Desde la raíz del repositorio:

```bash
cd game
npm ci
npm run dev
```

Vite mostrará la URL local. La landing puede abrirse desde la raíz o mediante el servidor de Vite.

## Compilar

```bash
cd game
npm run build
npm run preview
```

La salida compilada del juego queda en `game/dist/`. Ese directorio no se debe subir al repositorio.

## GitHub Pages

El flujo `.github/workflows/deploy-pages.yml` compila el juego y publica:

- `/` con la landing page.
- `/game/` con el videojuego compilado.

## Controles

- `A` o `Flecha izquierda`: moverse a la izquierda.
- `D` o `Flecha derecha`: moverse a la derecha.
- `E` o `Espacio`: abrir y cerrar recuerdos.
- `M` o `Esc`: volver al menú de capítulos.

## Publicar en itch.io

El paquete HTML del juego se genera desde `game/dist/`. Ejecuta `npm run build` dentro de `game/`, comprime el contenido de `dist/` e súbelo a itch.io marcándolo como ejecutable en el navegador.
