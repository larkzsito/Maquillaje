# Rubor en Crema Elaya

Página con animación al hacer scroll sobre el rubor en crema de Elaya Belleza, con información de la marca y una tienda con bolsa. React 18, TypeScript y Tailwind CSS 3, empaquetado con Vite.

## Uso

```bash
npm install
npm run dev        # servidor local
npm run typecheck  # comprueba tipos
npm run build      # genera dist/index.html en un solo archivo
```

## Estructura

```
src/
  App.tsx                  composición de la página
  data.ts                  tonos, productos, precios (COP) y distribuidores
  index.css                variables de color, @tailwind y estilos que Tailwind no cubre
  hooks/
    useStoryScroll.ts      animación del escenario según el scroll
    useStore.tsx           bolsa, pedido por WhatsApp y avisos
  components/
    Header.tsx  Story.tsx  Brand.tsx  Shop.tsx  Bag.tsx  Toast.tsx  Footer.tsx
    Defs.tsx               símbolos SVG compartidos
    HexChip.tsx            selector hexagonal de tono
  assets/bottle.jpg        foto del producto
```

## Cómo cambiar cosas

- **Productos y precios:** edita `src/data.ts`.
- **Fotos de productos:** agrega un campo `img` a `Product` y úsalo en `Shop.tsx` en lugar del símbolo `Glyph`.
- **Capítulos del scroll:** los rangos están en `RANGES` dentro de `src/hooks/useStoryScroll.ts`.
- **Colores:** variables al inicio de `src/index.css`.

Página independiente hecha con información pública; no es el sitio oficial de Elaya Belleza.
