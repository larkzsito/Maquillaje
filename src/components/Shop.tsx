import { useState, type CSSProperties } from 'react'
import { BASE_URL, FEATURED, FILTERS, PRODUCTS, RESELLERS, SHADES, money, type FilterId } from '../data'
import { useStore } from '../hooks/useStore'
import { Glyph } from './Defs'
import HexChip from './HexChip'

const btn =
  'inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-[1.4rem] py-3 text-[.98rem] font-semibold no-underline transition duration-200 hover:-translate-y-0.5'

function Featured() {
  const { add, toast } = useStore()
  const [sel, setSel] = useState(0)
  const shade = SHADES[sel]

  return (
    <div className="mb-12 grid grid-cols-[minmax(0,340px)_minmax(0,1fr)] items-center gap-[clamp(1.5rem,5vw,4rem)] rounded-[28px] bg-paper p-[clamp(1.4rem,3vw,2.6rem)] max-[860px]:grid-cols-1">
      <div
        aria-hidden="true"
        className="clip-hex relative isolate aspect-[.866/1] w-full bg-panel max-[860px]:mx-auto max-[860px]:max-w-[260px]"
      >
        <div className="bottle absolute inset-0 m-auto aspect-[410/720] h-full" />
      </div>
      <div>
        <h3 className="font-soft text-[clamp(1.9rem,3.4vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.02em]">
          {FEATURED.n}
        </h3>
        <div className="mt-2.5 text-2xl font-semibold leading-none tabular-nums">
          {money(FEATURED.p)} <small className="text-[.85rem] font-medium text-ink2">COP · 5&nbsp;g</small>
        </div>
        <p className="mt-4 max-w-[30rem] text-ink2">
          Fórmula cremosa de pigmentación construible que se adhiere naturalmente a la piel.
        </p>
        <fieldset className="m-0 mt-[1.4rem] min-w-0 border-0 p-0">
          <legend className="mb-2.5 p-0 text-[.92rem] font-semibold">Tono</legend>
          <div role="radiogroup" aria-label="Tono del rubor en crema" className="mb-2 flex flex-wrap gap-[.7rem]">
            {SHADES.map((s, i) => (
              <HexChip key={s.id} shade={s} mode="radio" active={sel === i} onClick={() => setSel(i)} />
            ))}
          </div>
          <div aria-live="polite" className="min-h-[1.5em] text-[.92rem] text-ink2">
            {shade.id}
          </div>
        </fieldset>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className={`${btn} bg-ink text-bg hover:bg-[#43315A]`}
            onClick={() => {
              add({ key: `${FEATURED.id}|${shade.id}`, n: FEATURED.n, p: FEATURED.p, shade: sel })
              toast(`Rubor en Crema ${shade.short} agregado`)
            }}
          >
            Agregar a la bolsa
          </button>
          <a
            className={`${btn} bg-transparent text-ink hover:bg-ink hover:text-bg`}
            href={`${BASE_URL}${FEATURED.id}/`}
            target="_blank"
            rel="noopener"
          >
            Ver en la tienda oficial
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Shop() {
  const { add, toast } = useStore()
  const [filter, setFilter] = useState<FilterId>('all')
  const items = PRODUCTS.filter((p) => filter === 'all' || p.cat === filter)

  return (
    <section
      id="tienda"
      className="scroll-mt-header mx-auto w-full max-w-[1240px] border-t border-line py-[clamp(4rem,9vw,8rem)]"
    >
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="font-soft text-[clamp(2.4rem,5.6vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-balance">
            Tienda Elaya
          </h2>
          <p className="mt-3 max-w-[28rem] text-ink2">
            Productos y precios de elayabelleza.com. Arma tu bolsa aquí y envía el pedido por WhatsApp a la marca.
          </p>
        </div>
        <div role="group" aria-label="Filtrar productos" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border-[1.5px] px-4 py-2 text-[.92rem] font-semibold transition-colors duration-200 hover:border-ink ${
                filter === f.id ? 'border-ink bg-ink text-bg' : 'border-line bg-transparent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {(filter === 'all' || filter === 'rubores') && <Featured />}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,230px),1fr))] gap-x-[1.6rem] gap-y-[2.4rem]">
        {items.map((p) => (
          <article key={p.id} className="group grid min-w-0 grid-rows-[auto_1fr] gap-4">
            <div
              className="relative grid aspect-[1.3/1] place-items-center rounded-[18px] bg-[color-mix(in_srgb,var(--t)_18%,var(--bg))]"
              style={{ '--t': p.t } as CSSProperties}
            >
              <Glyph
                id={p.g}
                className="max-h-[74%] w-[54%] text-[var(--t)] saturate-[1.1] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-1.5 group-hover:-rotate-[4deg]"
              />
            </div>
            <div>
              <h3 className="font-soft text-[1.3rem] font-medium leading-[1.15] tracking-[-0.02em]">{p.n}</h3>
              <p className="mt-1.5 text-[.94rem] leading-normal text-ink2">{p.d}</p>
              <div className="mt-3.5 flex items-center justify-between gap-3">
                <span className="font-bold tabular-nums">{money(p.p)}</span>
                <button
                  type="button"
                  aria-label={`Agregar ${p.n} a la bolsa`}
                  onClick={() => {
                    add({ key: p.id, n: p.n, p: p.p, shade: null })
                    toast(`${p.n} agregado a la bolsa`)
                  }}
                  className="grid h-[2.6rem] w-[2.6rem] flex-none place-items-center rounded-full border-[1.5px] border-ink bg-transparent text-[1.3rem] leading-none transition duration-200 hover:rotate-90 hover:bg-ink hover:text-bg"
                >
                  +
                </button>
              </div>
              <a
                className="mt-2 inline-block text-[.85rem] font-semibold text-rose-deep"
                href={`${BASE_URL}${p.id}/`}
                target="_blank"
                rel="noopener"
              >
                Ver en la tienda oficial
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 border-t border-line pt-8">
        <h3 className="font-soft mb-1.5 text-[1.6rem] font-medium leading-[1.02] tracking-[-0.02em]">
          También con distribuidores
        </h3>
        <p className="max-w-[36rem] text-ink2">
          Elaya se vende en otras tiendas de maquillaje. Precios y tonos pueden ser distintos.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {RESELLERS.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener"
              className="rounded-full border-[1.5px] border-line px-5 py-2.5 text-[.94rem] font-semibold no-underline transition-colors duration-200 hover:border-ink hover:bg-paper"
            >
              {r.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
