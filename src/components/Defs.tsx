import type { GlyphId } from '../data'

/** Shared SVG symbols: product glyphs and the hexagon outline reused by the plate and rings. */
export default function Defs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="g-blush" viewBox="0 0 60 80"><path d="M16 4h28l8 10v8H8v-8z" fill="currentColor" opacity=".85" /><path d="M12 26h36l-3 50H15z" fill="currentColor" opacity=".45" /></symbol>
        <symbol id="g-bottle" viewBox="0 0 60 80"><rect x="22" y="4" width="16" height="14" rx="3" fill="currentColor" /><path d="M14 22h32v52a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="currentColor" opacity=".5" /></symbol>
        <symbol id="g-tube" viewBox="0 0 60 80"><rect x="20" y="4" width="20" height="16" rx="4" fill="currentColor" /><rect x="18" y="22" width="24" height="54" rx="6" fill="currentColor" opacity=".5" /></symbol>
        <symbol id="g-compact" viewBox="0 0 60 80"><circle cx="30" cy="40" r="26" fill="currentColor" opacity=".45" /><circle cx="30" cy="40" r="16" fill="currentColor" opacity=".8" /></symbol>
        <symbol id="g-palette" viewBox="0 0 60 80"><rect x="6" y="16" width="48" height="48" rx="8" fill="currentColor" opacity=".4" /><circle cx="20" cy="32" r="7" fill="currentColor" /><circle cx="40" cy="32" r="7" fill="currentColor" opacity=".7" /><rect x="14" y="46" width="32" height="9" rx="4" fill="currentColor" opacity=".9" /></symbol>
        <symbol id="g-spray" viewBox="0 0 60 80"><path d="M24 4h14l4 6v10H22V10z" fill="currentColor" /><path d="M16 24h28v48a5 5 0 0 1-5 5H21a5 5 0 0 1-5-5z" fill="currentColor" opacity=".5" /></symbol>
        <symbol id="g-jar" viewBox="0 0 60 80"><rect x="8" y="22" width="44" height="14" rx="5" fill="currentColor" /><rect x="10" y="38" width="40" height="30" rx="8" fill="currentColor" opacity=".5" /></symbol>
        <polygon id="hexpts" points="100,0 200,57.75 200,173.25 100,231 0,173.25 0,57.75" />
      </defs>
    </svg>
  )
}

export function Glyph({ id, className }: { id: GlyphId; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  )
}
