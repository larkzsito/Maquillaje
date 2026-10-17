export type Shade = { id: string; short: string; c: string }

// Colours are visual approximations of the four tones, not lab-measured swatches.
export const SHADES: Shade[] = [
  { id: 'RC Coral 01', short: 'Coral 01', c: '#F2806B' },
  { id: 'RC Rosa 02', short: 'Rosa 02', c: '#EC7FA3' },
  { id: 'RC Granate 03', short: 'Granate 03', c: '#9C2F4E' },
  { id: 'RC Carmesi 04', short: 'Carmesi 04', c: '#C4163A' },
]

export type Category = 'rubores' | 'rostro' | 'ojos' | 'cuidado'
export type GlyphId = 'g-blush' | 'g-bottle' | 'g-tube' | 'g-compact' | 'g-palette' | 'g-spray' | 'g-jar'

export type Product = {
  id: string
  n: string
  p: number
  cat: Category
  g: GlyphId
  t: string
  d: string
  img?: string
  imgs?: string[]
}

// Productos disponibles
export const PRODUCTS: Product[] = [
  { id: 'rubor-cristal', n: 'Rubor Cristal', p: 21900, cat: 'rubores', g: 'g-blush', t: '#EC7FA3', d: 'Se adapta al pH de la piel. Formula en barra de 8g con brocha integrada para una aplicacion facil y precisa.', img: '/products/rubor-cristal-open.png', imgs: ['/products/rubor-cristal-closed.png', '/products/rubor-cristal-brush.png'] },
  { id: 'rubor-mousse', n: 'Rubor Mousse', p: 24900, cat: 'rubores', g: 'g-jar', t: '#F2806B', d: 'Rubor de textura mousse suave y ligera. Pigmentacion construible para un acabado natural o intenso.', img: '/products/rubor-mousse-red.png', imgs: ['/products/rubor-mousse-rosa-open.png', '/products/rubor-mousse-pink.png', '/products/rubor-mousse-coral.png'] },
  { id: 'tinta-jalea', n: 'Tinta Jalea', p: 21900, cat: 'rubores', g: 'g-tube', t: '#C4163A', d: 'Acabado translucido de aspecto natural. Formula en barra de 6g, disponible en 4 tonos vibrantes.', img: '/products/tinta-jalea-lila.png', imgs: ['/products/tinta-jalea-rojo.png', '/products/tinta-jalea-carmesi.png', '/products/tinta-jalea-granate.png', '/products/tinta-jalea-rosa.png'] },
  { id: 'aurhora', n: 'Aurhora', p: 39900, cat: 'rubores', g: 'g-palette', t: '#9C6FD0', d: 'Paleta de sombras, rubor en barra y marcador de labios. Set completo de maquillaje en un elegante estuche.', img: '/products/aurhora.png' },
  { id: 'base-fluida', n: 'Base Fluida', p: 31900, cat: 'rostro', g: 'g-bottle', t: '#D9A27E', d: 'Naturalmente impecable. Formula con vitamina E y acido hialuronico. Disponible en 13 tonos.', img: '/products/base-fluida.png', imgs: ['/products/base-fluida-tonos.png'] },
  { id: 'base', n: 'Base con SPF 30', p: 34900, cat: 'rostro', g: 'g-bottle', t: '#C98F6C', d: 'Base multibeneficio con proteccion solar FPS 30. Alto cubrimiento, efecto mate y larga duracion. Disponible en 13 tonos.', img: '/products/base-spf30.png', imgs: ['/products/base-spf30-tonos.png'] },
  { id: 'corrector', n: 'Corrector', p: 17900, cat: 'rostro', g: 'g-tube', t: '#E0B48F', d: 'Alta cobertura, textura ligera y acabado natural. Formula fluida de 12ml disponible en 8 tonos.', img: '/products/corrector.png', imgs: ['/products/corrector-tonos.png'] },
  { id: 'polvo-compacto', n: 'Polvo Compacto', p: 25900, cat: 'rostro', g: 'g-compact', t: '#D9A27E', d: 'Tono de piel uniforme con acabado sedoso. Disponible en 4 tonos que se adaptan a tu piel.', img: '/products/polvo-compacto.png', imgs: ['/products/polvo-compacto-tonos.png'] },
  { id: 'fijador-de-maquillaje', n: 'Fijador de Maquillaje', p: 32900, cat: 'rostro', g: 'g-spray', t: '#6FA8C8', d: 'Spray de fijacion de 100ml. Mejora, prolonga, refresca y revitaliza tu maquillaje todo el dia.', img: '/products/fijador-maquillaje.png' },
  { id: 'iluminador-duo-nuevo', n: 'Iluminador Duo', p: 24900, cat: 'rostro', g: 'g-compact', t: '#E7B84F', d: 'Formula reflectante en dos tonos complementarios. Aplica en pomulos, nariz y frente para un brillo natural.', img: '/products/iluminador-duo.png', imgs: ['/products/iluminador-duo-tonos.png'] },
  { id: 'escudo-maquillaje', n: 'Escudo Maquillaje', p: 19900, cat: 'rostro', g: 'g-bottle', t: '#7F8FD6', d: 'Ayuda a que el maquillaje se adhiera mejor y dure mas. Prebase de 12ml para una aplicacion perfecta.', img: '/products/escudo-maquillaje.png' },
  { id: 'imprescindibles-en-crema', n: 'Imprescindibles en Crema', p: 29900, cat: 'rostro', g: 'g-palette', t: '#E98A86', d: 'Paleta multifuncional en crema. 6 tonos versatiles para contorno, iluminacion y color en un solo estuche.', img: '/products/imprescindibles-crema.png' },
  { id: 'sombra-liquida-brillante', n: 'Sombra Liquida Brillante', p: 14900, cat: 'ojos', g: 'g-tube', t: '#9C6FD0', d: 'Pigmentacion ultrabrillante en formula liquida de 5g. Disponible en 6 tonos metalicos deslumbrantes.', img: '/products/sombra-liquida-brillante.png', imgs: ['/products/sombra-liquida-tonos.png'] },
  { id: 'miel-duo-labios', n: 'Miel Duo Labios', p: 19000, cat: 'ojos', g: 'g-tube', t: '#E9A04F', d: 'Brillo nutritivo y mascarilla restauradora en un duo irresistible de 7g. Hidrata, nutre y embellece tus labios.', img: '/products/miel-duo-labios.png' },
  { id: 'crema-facial-hidratante-avanzada', n: 'Crema Facial Hidratante Avanzada', p: 49900, cat: 'cuidado', g: 'g-jar', t: '#6FB5A8', d: 'Hidratante avanzada con ceramidas, acido hialuronico y antioxidantes. Probada dermatologicamente.', img: '/products/crema-facial-hidratante.png' },
]

export const FEATURED = { id: 'rubor-en-crema', n: 'Rubor en Crema', p: 21900 }

export const RUBOR_CREMA_IMGS: Record<string, string> = {
  'RC Coral 01':   '/products/rubor-crema-coral01.png',
  'RC Rosa 02':    '/products/rubor-crema-rosa02.png',
  'RC Granate 03': '/products/rubor-crema-granate03.png',
  'RC Carmesi 04': '/products/rubor-crema-carmesi04.png',
}

export type FilterId = 'all' | Category
export const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'rubores', label: 'Rubores' },
  { id: 'rostro', label: 'Rostro' },
  { id: 'ojos', label: 'Ojos y labios' },
  { id: 'cuidado', label: 'Cuidado' },
]

export const WHATSAPP = '573157154772'

export const money = (n: number) => '$' + n.toLocaleString('es-CO')
