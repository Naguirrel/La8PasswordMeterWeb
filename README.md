# La8 Password Meter Web

Aplicación React con Vite y TypeScript para medir la fortaleza de un password en tiempo real. El proyecto separa la lógica pura de cálculo del componente visual y usa pruebas automatizadas con Vitest y React Testing Library.

## Instalación

```bash
npm install
```

Si usas Bun:

```bash
bun install
```

## Desarrollo

Inicia el servidor local de Vite:

```bash
npm run dev
```

Con Bun:

```bash
bun run dev
```

## Tests

Ejecuta la suite completa de pruebas:

```bash
npm run test
```

Modo watch:

```bash
npm run test:watch
```

Con Bun:

```bash
bun run test
```

## Coverage

Genera el reporte de cobertura en la carpeta `coverage/`:

```bash
npm run coverage
```

Con Bun:

```bash
bun run coverage
```

## Lint

Ejecuta ESLint sobre el proyecto:

```bash
npm run lint
```

Con Bun:

```bash
bun run lint
```

## CI

El workflow de GitHub Actions está en `.github/workflows/ci.yml`.

En cada push a `main` y en cada pull request, CI:

- instala dependencias con Bun
- ejecuta lint
- ejecuta tests
- genera coverage

## Flujo TDD

El proyecto siguió un flujo TDD:

1. Se escribieron primero los tests para la lógica pura y el componente.
2. Los tests fallaron inicialmente porque la funcionalidad todavía no estaba implementada.
3. Se implementó lo mínimo necesario para pasar los tests.
4. Se refactorizó manteniendo la suite en verde.

Los tests cubren renderizado, accesibilidad, edge cases, barra de progreso, reglas de mayúsculas/minúsculas y separación entre lógica pura y UI.

## Apartados Del Laboratorio

En este laboratorio se realizarón los siguientes apartados:

- (25 puntos) Configuración correcta del proyecto con Vite, Vitest y React Testing Library.
- (25 puntos) Evidencia del flujo TDD en el historial de commits (tests escritos antes que implementación).
- (25 puntos) Cobertura y calidad de tests según los requerimientos.
- (15 puntos) Implementación funcional que pasa todos los tests.
- (10 puntos) Separación entre lógica pura y componente.
- (5 puntos) Agregar un test que verifique que el input es accesible utilizando queries por rol o label.
- (5 puntos) Mostrar visualmente la fortaleza con una barra de progreso además del texto, con sus tests correspondientes.
- (5 puntos) Agregar una regla adicional de fortaleza que considere mayúsculas y minúsculas mezcladas, con sus tests correspondientes.
- (5 puntos) Configurar coverage con Vitest e incluir un script para generar el reporte.
- (5 puntos) Utilizar TypeScript.
- (5 puntos) Configurar un script de lint y aplicarlo al proyecto.
- (5 puntos) Configurar CI con GitHub Actions que corra los tests en cada push.
