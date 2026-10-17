import { useEffect, useRef, useState } from 'react'
import { money, type Product } from '../data'
import { useStore } from '../hooks/useStore'
import { Glyph } from './Defs'

type Props = { product: Product; onClose: () => void }

export default function ProductModal({ product: p, onClose }: Props) {
  const { add, toast } = useStore()
  const [imgIdx, setImgIdx] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  const allImgs = [p.img, ...(p.imgs ?? [])].filter(Boolean) as string[]
  const currentImg = allImgs[imgIdx]

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement | null
    const id = requestAnimationFrame(() => {
      setShown(true)
      closeRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  function handleClose() {
    setShown(false)
    setTimeout(() => {
      onClose()
      lastFocus.current?.focus?.()
    }, 300)
  }

  function handleAdd() {
    add({ key: p.id, n: p.n, p: p.p, shade: null })
    toast(`${p.n} agregado a la bolsa`)
    handleClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-[90] bg-[rgba(20,12,30,.6)] backdrop-blur-[3px] transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.n}
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${shown ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="relative w-full max-w-[820px] max-h-[90vh] overflow-y-auto rounded-[28px] bg-paper shadow-[0_32px_80px_rgba(43,30,54,.3)] grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] max-[640px]:grid-cols-1">

          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-10 h-[2.4rem] w-[2.4rem] rounded-full border-[1.5px] border-line bg-paper text-[1.2rem] leading-none hover:border-ink hover:bg-ink hover:text-bg transition-colors duration-200"
          >
            &times;
          </button>

          {/* Images */}
          <div className="flex flex-col gap-3 p-[clamp(1rem,3vw,2rem)]">
            {/* Main image */}
            <div
              className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-white"
            >
              {currentImg ? (
                <img
                  key={currentImg}
                  src={currentImg}
                  alt={p.n}
                  className="h-full w-full object-contain p-5 transition-opacity duration-200"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Glyph id={p.g} className="w-[55%]" />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImgs.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {allImgs.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImgIdx(i)}
                    className={`h-[3.6rem] w-[3.6rem] overflow-hidden rounded-[10px] border-[2px] transition-all duration-200 bg-white ${i === imgIdx ? 'border-ink' : 'border-line hover:border-ink/50'}`}
                  >
                    <img
                      src={src}
                      alt={`${p.n} ${i + 1}`}
                      className="h-full w-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between gap-6 p-[clamp(1rem,3vw,2rem)] pl-0 max-[640px]:pl-[clamp(1rem,3vw,2rem)] max-[640px]:pt-0">
            <div>
              <p className="text-[.82rem] font-semibold uppercase tracking-[.12em] text-ink2 mb-2">Maquillaje Premium</p>
              <h2 className="font-soft text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                {p.n}
              </h2>
              <div className="mt-3 text-[1.8rem] font-bold tabular-nums leading-none">
                {money(p.p)}
                <small className="ml-2 text-[.85rem] font-medium text-ink2">COP</small>
              </div>
              <p className="mt-5 leading-relaxed text-ink2">
                {p.d}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-[1.6rem] py-3.5 text-[1rem] font-semibold text-bg transition-all duration-200 hover:bg-[#43315A] hover:-translate-y-0.5 active:translate-y-0"
              >
                Agregar a la bolsa
              </button>
              <p className="text-center text-[.82rem] text-ink2">
                Distribuidor de maquillaje premium.<br />
                Pedidos por WhatsApp con envío a todo el país.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
