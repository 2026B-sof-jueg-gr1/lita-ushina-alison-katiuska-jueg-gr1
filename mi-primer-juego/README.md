# Umbra Run

Prototipo de auto-runner de terror psicológico construido con Phaser 4 y Vite.

## Plan de desarrollo

1. **Fase 1 - Prototipo base (actual):** configuración Vite/Phaser, cinco escenas, nivel geométrico, auto-run, salto, gravedad, cámara lateral, obstáculos letales y meta.
2. **Fase 2 - Inserción de arte:** reemplazar las texturas geométricas por el fantasma/payaso y obstáculos de terror; crear cuatro mapas temáticos.
3. **Fase 3 - Atmósfera y audio:** añadir música tensa, efectos de salto/choque, niebla, sombras y partículas.
4. **Fase 4 - Pulido final:** mejorar menús, transiciones, accesibilidad y progresión de dificultad.

## Manual de usuario

### Cómo ejecutar

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre la URL indicada por Vite (normalmente `http://localhost:5173`).
Para comprobar la versión de producción:

```bash
npm run build
```

### Funcionalidad disponible por fase

| Fase | Estado | Qué funciona | Cómo usarlo |
| --- | --- | --- | --- |
| 1 | Disponible | Boot, Preloader, Menú, Juego y Meta; personaje que avanza solo; salto; gravedad; cámara; calabazas, estantes y picos geométricos; muerte y victoria. | Pulsa **Espacio**, **W** o **Flecha arriba** para saltar. Evita obstáculos. Al morir o ganar, pulsa **Espacio** o haz clic para reiniciar. |
| 2 | Pendiente | Sprites finales y cuatro mapas. | Se documentará al integrar el arte. |
| 3 | Pendiente | Música, efectos y partículas atmosféricas. | Se documentará al integrar audio y VFX. |
| 4 | Pendiente | Menús, transiciones y dificultad final. | Se documentará al completar el pulido. |

## Estructura inicial

```text
mi-primer-juego/
├── index.html
├── package.json
├── README.md
├── src/
│   ├── main.js
│   └── scenes/
│       ├── BootScene.js
│       ├── PreloaderScene.js
│       ├── MenuScene.js
│       ├── GameScene.js
│       └── EndScene.js
```
