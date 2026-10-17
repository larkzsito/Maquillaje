import type { CSSProperties } from 'react'
import type { Shade } from '../data'

type Props = {
  shade: Shade
  active: boolean
  onClick: () => void
  /** "pressed" for toggle buttons, "radio" for a radio group. */
  mode: 'pressed' | 'radio'
}

/** Hexagonal colour swatch used for tone selection. */
export default function HexChip({ shade, active, onClick, mode }: Props) {
  const aria = mode === 'radio' ? { role: 'radio', 'aria-checked': active } : { 'aria-pressed': active }
  return (
    <button
      type="button"
      title={shade.id}
      aria-label={shade.id}
      onClick={onClick}
      {...aria}
      className={`clip-hex relative h-16 w-14 border-0 p-0 transition-colors duration-200 max-[760px]:h-[55px] max-[760px]:w-12 ${
        active ? 'bg-ink' : 'bg-line'
      }`}
    >
      <span
        className="clip-hex absolute inset-1 bg-[var(--c)]"
        style={{ '--c': shade.c } as CSSProperties}
      />
    </button>
  )
}
