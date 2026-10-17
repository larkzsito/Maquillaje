import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SHADES, money } from '../data'
import { useStore } from '../hooks/useStore'

const btn =
  'inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-[1.4rem] py-3 text-[.98rem] font-semibold no-underline transition duration-200'

/** Slide-in bag. It keeps the DOM mounted for the close animation, then hides it. */
export default function Bag() {
  const { items, total, change, remove, orderText, whatsappHref, bagOpen, closeBag, toast } = useStore()
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (bagOpen) {
      lastFocus.current = document.activeElement as HTMLElement | null
      setMounted(true)
      const id = requestAnimationFrame(() => {
        setShown(true)
        closeRef.current?.focus()
      })
      return () => cancelAnimationFrame(id)
    }
    setShown(false)
    const t = window.setTimeout(() => setMounted(false), 360)
    lastFocus.current?.focus?.()
    return () => window.clearTimeout(t)
  }, [bagOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && bagOpen) closeBag()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [bagOpen, closeBag])

  const copy = async () => {
    if (!items.length) return toast('Agrega un producto primero')
    const fallback = () => {
      if (detailsRef.current) detailsRef.current.open = true
      textRef.current?.focus()
      textRef.current?.select()
      toast('Selecciona el texto y cópialo')
    }
    try {
      await navigator.clipboard.writeText(orderText)
      toast('Pedido copiado')
    } catch {
      fallback()
    }
  }

  if (!mounted) return null

  return (
    <>
      <div
        onClick={closeBag}
        className={`fixed inset-0 z-[70] bg-[rgba(43,30,54,.45)] transition-opacity duration-[250ms] ${shown ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="bagTitle"
        className={`fixed bottom-0 right-0 top-0 z-[80] flex w-[min(100%,420px)] flex-col bg-paper pb-[calc(1.2rem+env(safe-area-inset-bottom,0px))] pl-[1.4rem] pr-[max(1.2rem,env(safe-area-inset-right,0px))] pt-[calc(1.2rem+env(safe-area-inset-top,0px))] shadow-[-20px_0_60px_rgba(43,30,54,.18)] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
          shown ? 'translate-x-0' : 'translate-x-[104%]'
        }`}
      >
        <header className="mb-4 flex items-center justify-between">
          <h2 id="bagTitle" className="font-soft text-[1.8rem] font-medium leading-[1.02] tracking-[-0.02em]">
            Tu bolsa
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeBag}
            aria-label="Cerrar la bolsa"
            className="h-[2.6rem] w-[2.6rem] rounded-full border-[1.5px] border-line bg-transparent text-[1.3rem] leading-none hover:border-ink"
          >
            &times;
          </button>
        </header>

        <div className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto py-1.5">
          {items.length === 0 ? (
            <div className="py-[1.4rem] text-ink2">
              <b className="font-soft mb-1.5 block text-[1.3rem] font-medium leading-tight text-ink">Tu bolsa está vacía</b>
              Agrega el Rubor en Crema para empezar.
            </div>
          ) : (
            items.map((i, k) => (
              <div key={i.key} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-line pb-4">
                <span className="font-semibold">{i.n}</span>
                <span className="col-start-2 row-start-1 text-right font-bold tabular-nums">{money(i.p * i.q)}</span>
                {i.shade !== null && (
                  <span className="col-start-1 flex items-center gap-[.45rem] text-[.86rem] text-ink2">
                    <i
                      className="clip-hex h-[11px] w-2.5 bg-[var(--c)]"
                      style={{ '--c': SHADES[i.shade].c } as CSSProperties}
                    />
                    {SHADES[i.shade].id}
                  </span>
                )}
                <div className="col-span-2 mt-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Quitar una unidad de ${i.n}`}
                    onClick={() => change(k, -1)}
                    className="h-8 w-8 rounded-full border-[1.5px] border-line bg-transparent leading-none hover:border-ink"
                  >
                    &minus;
                  </button>
                  <output aria-label="Cantidad" className="min-w-[1.6rem] text-center font-semibold tabular-nums">
                    {i.q}
                  </output>
                  <button
                    type="button"
                    aria-label={`Agregar una unidad de ${i.n}`}
                    onClick={() => change(k, 1)}
                    className="h-8 w-8 rounded-full border-[1.5px] border-line bg-transparent leading-none hover:border-ink"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(k)}
                    className="ml-auto border-0 bg-transparent px-1 text-[.86rem] font-semibold text-rose-deep underline"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-baseline justify-between pt-4 text-xl font-bold tabular-nums">
          <span>Total</span>
          <span>{money(total)}</span>
        </div>
        <p className="mb-4 mt-2.5 text-[.84rem] text-ink2">Sin envío ni descuentos. La marca los confirma por WhatsApp.</p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener"
          aria-disabled={items.length === 0}
          className={`${btn} bg-ink text-bg hover:bg-[#43315A] ${items.length === 0 ? 'pointer-events-none opacity-45' : ''}`}
        >
          Pedir por WhatsApp
        </a>
        <button type="button" onClick={copy} className={`${btn} mt-2.5 bg-transparent text-ink hover:bg-ink hover:text-bg`}>
          Copiar pedido
        </button>
        <details ref={detailsRef} className="mt-3 text-[.86rem] text-ink2">
          <summary className="cursor-pointer">Ver texto del pedido</summary>
          <textarea
            ref={textRef}
            readOnly
            value={orderText}
            className="mt-2 h-28 w-full resize-y rounded-[10px] border border-line bg-bg p-2.5 text-[.82rem] leading-snug text-ink"
          />
        </details>
      </aside>
    </>
  )
}
