export type Shade = { id: string; short: string; c: string }

// Colours are visual approximations of the four tones, not lab-measured swatches.
export const SHADES: Shade[] = [
  { id: 'RC Coral 01', short: 'Coral 01', c: '#F2806B' },
  { id: 'RC Rosa 02', short: 'Rosa 02', c: '#EC7FA3' },
  { id: 'RC Granate 03', short: 'Granate 03', c: '#9C2F4E' },
  { id: 'RC Carmesí 04', short: 'Carmesí 04', c: '#C4163A' },
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
}

export const BASE_URL = 'https://elayabelleza.com/product/'

// Names, prices (COP) and slugs taken from elayabelleza.com in October 2026.
export const PRODUCTS: Product[] = [
  { id: 'rubor-cristal', n: 'Rubor Cristal', p: 21900, cat: 'rubores', g: 'g-blush', t: '#EC7FA3', d: 'Se adapta al pH de la piel.' },
  { id: 'rubor-mousse', n: 'Rubor Mousse', p: 24900, cat: 'rubores', g: 'g-jar', t: '#F2806B', d: 'Rubor de textura mousse.' },
  { id: 'tinta-jalea', n: 'Tinta Jalea', p: 21900, cat: 'rubores', g: 'g-tube', t: '#C4163A', d: 'Acabado translúcido de aspecto natural.' },
  { id: 'aurhora', n: 'Aurhora', p: 39900, cat: 'rubores', g: 'g-palette', t: '#9C6FD0', d: 'Paleta de sombras, rubor en barra y marcador de labios.' },
  { id: 'base-fluida', n: 'Base Fluida', p: 31900, cat: 'rostro', g: 'g-bottle', t: '#D9A27E', d: 'Naturalmente impecable. Tiene 13 tonos.' },
  { id: 'base', n: 'Base con SPF 30', p: 34900, cat: 'rostro', g: 'g-bottle', t: '#C98F6C', d: 'Base multibeneficio con protección solar.' },
  { id: 'corrector', n: 'Corrector', p: 17900, cat: 'rostro', g: 'g-tube', t: '#E0B48F', d: 'Alta cobertura, textura ligera y acabado natural.' },
  { id: 'polvo-compacto', n: 'Polvo Compacto', p: 25900, cat: 'rostro', g: 'g-compact', t: '#D9A27E', d: 'Tono de piel uniforme.' },
  { id: 'fijador-de-maquillaje', n: 'Fijador de Maquillaje', p: 32900, cat: 'rostro', g: 'g-spray', t: '#6FA8C8', d: 'Spray de fijación.' },
  { id: 'iluminador-duo-nuevo', n: 'Iluminador Dúo', p: 24900, cat: 'rostro', g: 'g-compact', t: '#E7B84F', d: 'Fórmula reflectante.' },
  { id: 'escudo-maquillaje', n: 'Escudo Maquillaje', p: 19900, cat: 'rostro', g: 'g-bottle', t: '#7F8FD6', d: 'Ayuda a que el maquillaje se adhiera.' },
  { id: 'imprescindibles-en-crema', n: 'Imprescindibles en Crema', p: 29900, cat: 'rostro', g: 'g-palette', t: '#E98A86', d: 'Paleta multifuncional en crema.' },
  { id: 'sombra-liquida-brillante', n: 'Sombra Líquida Brillante', p: 14900, cat: 'ojos', g: 'g-tube', t: '#9C6FD0', d: 'Pigmentación ultrabrillante.' },
  { id: 'miel-duo-labios', n: 'Miel Dúo Labios', p: 19000, cat: 'ojos', g: 'g-tube', t: '#E9A04F', d: 'Brillo nutritivo y máscara restauradora.' },
  { id: 'crema-facial-hidratante-avanzada', n: 'Crema Facial Hidratante Avanzada', p: 49900, cat: 'cuidado', g: 'g-jar', t: '#6FB5A8', d: 'Hidratante, probada dermatológicamente.' },
]

export const FEATURED = { id: 'rubor-en-crema', n: 'Rubor en Crema', p: 21900 }

export type FilterId = 'all' | Category
export const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'rubores', label: 'Rubores' },
  { id: 'rostro', label: 'Rostro' },
  { id: 'ojos', label: 'Ojos y labios' },
  { id: 'cuidado', label: 'Cuidado' },
]

export const RESELLERS = [
  { name: 'Kroma Space', href: 'https://kromaspace.com/producto/rubor-en-crema-elaya/' },
  { name: 'Rose Glam', href: 'https://roseglam.co/categoria/elaya/' },
  { name: 'Dream On Cosmetics', href: 'https://dreamoncosmetics.com/collections/marca-elaya' },
  { name: 'Dulce y Bella Makeup', href: 'https://dulceybellamakeup.sumerlabs.com/categoria/Elaya' },
]

export const WHATSAPP = '573157154772'

export const money = (n: number) => '$' + n.toLocaleString('es-CO')
