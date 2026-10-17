import { useStore } from '../hooks/useStore'

const LINKS = [
  { href: '#producto', label: 'Producto' },
  { href: '#marca', label: 'La marca' },
  { href: '#tienda', label: 'Tienda' },
]

export default function Header() {
  const { count, openBag } = useStore()
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 h-[var(--hh)] border-b border-line bg-bg">
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between gap-4">
        <a
          href="#producto"
          aria-label="Rubor en Crema Elaya, inicio"
          className="font-soft flex items-center gap-2.5 whitespace-nowrap text-xl font-medium leading-none tracking-[-0.01em] no-underline max-[760px]:text-[1.1rem]"
        >
          <svg viewBox="0 0 22 25" className="h-[25px] w-[22px] flex-none" aria-hidden="true">
            <polygon points="11,0 22,6.25 22,18.75 11,25 0,18.75 0,6.25" style={{ fill: 'var(--shade)' }} />
          </svg>
          Rubor en Crema
        </a>
        <nav aria-label="Secciones" className="flex items-center gap-[1.6rem] text-[.95rem] font-medium">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-1.5 text-ink2 no-underline hover:text-ink max-[860px]:hidden"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openBag}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-transparent px-4 py-2 text-[.92rem] font-semibold hover:bg-ink hover:text-bg"
          >
            Bolsa
            <span className="inline-grid h-[1.4rem] min-w-[1.4rem] place-items-center rounded-full bg-rose-deep px-1 text-[.78rem] tabular-nums text-white">
              {count}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
