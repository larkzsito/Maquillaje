import { useRef, useState, type ReactNode } from 'react'
import { RUBOR_CREMA_IMGS, SHADES } from '../data'
import { CHAPTER_CENTERS, CHAPTER_LABELS, SHADE_SCROLL, scrollToProgress, useStoryScroll } from '../hooks/useStoryScroll'
import HexChip from './HexChip'

/** One chapter of copy. Chapters overlap in the same grid cell; the scroll hook fades them. */
function Chapter({ index, children }: { index: number; children: ReactNode }) {
  return (
    <article
      data-ch={index}
      data-on={index === 0 ? 'true' : 'false'}
      aria-hidden={index === 0 ? undefined : true}
      style={index === 0 ? { opacity: 1 } : undefined}
      className="invisible col-start-1 row-start-1 max-w-[34rem] self-center opacity-0 will-change-[opacity,transform] data-[on=true]:visible max-[760px]:self-start"
    >
      {children}
    </article>
  )
}

const h2 =
  'font-soft mb-4 text-[clamp(2rem,4.1vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-balance max-[760px]:mb-2.5 max-[760px]:text-[clamp(1.7rem,7.4vw,2.3rem)]'
const para = 'max-w-[30rem] text-ink2 max-[760px]:text-base max-[760px]:leading-normal'
const btn =
  'inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-[1.4rem] py-3 text-[.98rem] font-semibold no-underline transition duration-200 hover:-translate-y-0.5 max-[760px]:px-[1.1rem] max-[760px]:py-2.5 max-[760px]:text-[.92rem]'

const SMEAR = 'M14 68 C 62 8, 112 104, 172 54 S 272 18, 346 62'

export default function Story() {
  const rootRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [shade, setShade] = useState(0)
  useStoryScroll(rootRef, { onActive: setActive, onShade: setShade })

  const go = (p: number) => scrollToProgress(rootRef.current, p)

  return (
    <section
      id="producto"
      ref={rootRef}
      aria-label="El producto"
      className="relative h-[640svh] max-[760px]:h-[600svh]"
    >
      <div
        data-ref="pin"
        className="pin-box sticky mx-auto grid min-h-[520px] w-full max-w-[1240px] grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center gap-8 overflow-x-clip max-[760px]:min-h-[480px] max-[760px]:grid-cols-1 max-[760px]:grid-rows-[auto_1fr] max-[760px]:items-start max-[760px]:gap-1.5"
      >
        {/* Copy */}
        <div className="relative z-[3] grid min-w-0 max-[760px]:self-start max-[760px]:pt-6">
          <Chapter index={0}>
            <h1 className="text-[clamp(3.4rem,9.2vw,8.4rem)] font-[450] leading-[.9] tracking-[-0.035em] font-soft max-[760px]:text-[clamp(2.8rem,15vw,4.4rem)]">
              <span className="block overflow-hidden pb-[.08em]">
                <span className="block animate-lineup">Rubor</span>
              </span>
              <span className="block overflow-hidden pb-[.08em]">
                <span className="block animate-lineup [animation-delay:.12s]">en Crema</span>
              </span>
            </h1>
            <p className="mt-[1.4rem] max-w-[30rem] text-[1.12rem] text-ink2 max-[760px]:mt-3 max-[760px]:text-base">
              Fórmula cremosa en frasco hexagonal de 5&nbsp;g. Desliza para ver cómo se funde en la piel.
            </p>
            <div className="mt-[1.4rem] inline-flex items-baseline gap-2 rounded-full border border-line bg-paper px-4 py-2 font-semibold tabular-nums max-[760px]:mt-3">
              $21.900 <small className="text-[.82rem] font-medium text-ink2">COP</small>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-ink2 max-[760px]:hidden" aria-hidden="true">
              <i className="block h-10 w-0.5 origin-top animate-cue bg-gradient-to-b from-ink to-transparent" />
              Desliza
            </div>
          </Chapter>

          <Chapter index={1}>
            <h2 className={h2}>Color cremoso que se funde con la piel</h2>
            <p className={para}>
              Su fórmula cremosa de pigmentación construible se adhiere de forma natural a la piel. Una pasada da un
              toque suave; otra capa sube la intensidad.
            </p>
            <svg
              className="mt-6 block h-auto w-[min(100%,360px)] overflow-visible max-[760px]:mt-4 max-[760px]:w-[min(100%,280px)]"
              viewBox="0 0 360 110"
              aria-hidden="true"
            >
              <defs>
                <filter id="soft" x="-20%" y="-60%" width="140%" height="220%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <path
                data-ref="smearBlur"
                d={SMEAR}
                pathLength={1}
                fill="none"
                strokeWidth={34}
                strokeLinecap="round"
                opacity={0.45}
                filter="url(#soft)"
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{ stroke: 'var(--shade)' }}
              />
              <path
                data-ref="smearCore"
                d={SMEAR}
                pathLength={1}
                fill="none"
                strokeWidth={16}
                strokeLinecap="round"
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{ stroke: 'var(--shade)' }}
              />
            </svg>
          </Chapter>

          <Chapter index={2}>
            <h2 className={h2}>Cuatro tonos, de coral a carmesí</h2>
            <p className={para}>Elige un tono y el escenario cambia de color con él.</p>
            <div
              role="group"
              aria-label="Tonos del rubor"
              className="mb-4 mt-[1.4rem] flex flex-wrap gap-[.7rem] max-[760px]:mb-2.5 max-[760px]:mt-3"
            >
              {SHADES.map((s, i) => (
                <HexChip
                  key={s.id}
                  shade={s}
                  mode="pressed"
                  active={shade === i}
                  onClick={() => go(SHADE_SCROLL.start + (i + 0.5) * SHADE_SCROLL.step)}
                />
              ))}
            </div>
            <div aria-live="polite" className="font-soft text-2xl font-medium leading-tight">
              {SHADES[shade].id}
              <small className="mt-1 block font-body text-[.85rem] font-medium leading-snug text-ink2">
                Tono {shade + 1} de 4. Los colores en pantalla son una aproximación.
              </small>
            </div>
          </Chapter>

          <Chapter index={3}>
            <h2 className={h2}>Se aplica en tres gestos</h2>
            <ol className="mt-5 grid list-none gap-[.9rem] p-0 max-[760px]:mt-3 max-[760px]:gap-2">
              {[
                'Toma una pequeña cantidad.',
                'Aplícala sobre las mejillas limpias o sobre la base.',
                'Difumina con dedos, brocha o esponja y suma capas para más intensidad.',
              ].map((t, i) => (
                <li
                  key={t}
                  data-step={i}
                  className="grid grid-cols-[2.1rem_1fr] items-start gap-[.9rem] will-change-[opacity,transform]"
                >
                  <b className="clip-hex grid h-[2.4rem] w-[2.1rem] place-items-center bg-ink text-[.85rem] font-semibold leading-none tabular-nums text-bg">
                    {i + 1}
                  </b>
                  <span className="text-ink2">{t}</span>
                </li>
              ))}
            </ol>
            <svg
              className="mt-6 block h-auto w-[min(100%,230px)] max-[760px]:mt-2.5 max-[760px]:w-[150px]"
              viewBox="0 0 230 150"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="cg" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopOpacity={0.85} style={{ stopColor: 'var(--shade)' }} />
                  <stop offset="1" stopOpacity={0} style={{ stopColor: 'var(--shade)' }} />
                </radialGradient>
                <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#F6D6C4" />
                  <stop offset="1" stopColor="#EDB9A0" />
                </linearGradient>
              </defs>
              <ellipse cx="115" cy="75" rx="108" ry="68" fill="url(#skin)" />
              <circle data-ref="dab" cx="82" cy="78" r="9" opacity="0" style={{ fill: 'var(--shade)' }} />
              <circle data-ref="l1" cx="92" cy="78" r="44" fill="url(#cg)" opacity="0" style={{ transformOrigin: '92px 78px' }} />
              <circle data-ref="l2" cx="112" cy="74" r="52" fill="url(#cg)" opacity="0" style={{ transformOrigin: '112px 74px' }} />
              <circle data-ref="l3" cx="130" cy="72" r="58" fill="url(#cg)" opacity="0" style={{ transformOrigin: '130px 72px' }} />
            </svg>
          </Chapter>

          <Chapter index={4}>
            <h2 className={h2}>Todo en un frasco de 5&nbsp;g</h2>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-[1.4rem] gap-y-[.55rem] text-[.98rem] max-[760px]:mt-3 max-[760px]:gap-y-1.5 max-[760px]:text-[.92rem]">
              <dt className="text-ink2">Formato</dt>
              <dd className="m-0 font-semibold">Frasco hexagonal, 5&nbsp;g</dd>
              <dt className="text-ink2">Tonos</dt>
              <dd className="m-0 font-semibold">Coral 01, Rosa 02, Granate 03, Carmesí 04</dd>
              <dt className="text-ink2">Textura</dt>
              <dd className="m-0 font-semibold">Cremosa, pigmentación construible</dd>
              <dt className="text-ink2">Precio</dt>
              <dd className="m-0 font-semibold">$21.900 COP</dd>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3 max-[760px]:mt-4">
              <a href="#tienda" className={`${btn} bg-ink text-bg hover:bg-[#43315A]`}>
                Comprar el rubor
              </a>
              <a href="#marca" className={`${btn} bg-transparent text-ink hover:bg-ink hover:text-bg`}>
                Conocer la marca
              </a>
            </div>
          </Chapter>
        </div>

        {/* Product */}
        <div className="stage-h relative grid min-w-0 place-items-center max-[760px]:order-first max-[760px]:mt-[1.1rem]">
          <div
            data-ref="glow"
            className="pointer-events-none absolute -inset-[10%] opacity-50 blur-[34px]"
            style={{
              background:
                'radial-gradient(38% 34% at 30% 36%, var(--shade), transparent 70%), radial-gradient(34% 30% at 72% 68%, var(--shade), transparent 70%)',
            }}
          />
          <div className="relative isolate h-[var(--H)] w-[calc(var(--H)*.866)]">
            <svg
              data-ref="plate"
              viewBox="0 0 200 231"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full animate-plate overflow-visible will-change-transform"
            >
              <use href="#hexpts" style={{ fill: 'var(--panel)' }} />
            </svg>
            <svg
              data-ref="r1"
              viewBox="0 0 200 231"
              aria-hidden="true"
              className="absolute -inset-[9%] h-[118%] w-[118%] overflow-visible will-change-transform"
            >
              <use href="#hexpts" fill="none" strokeWidth={1.2} opacity={0.75} style={{ stroke: 'var(--shade)' }} />
            </svg>
            <svg
              data-ref="r2"
              viewBox="0 0 200 231"
              aria-hidden="true"
              className="absolute -inset-[20%] h-[140%] w-[140%] overflow-visible will-change-transform"
            >
              <use
                href="#hexpts"
                fill="none"
                strokeWidth={0.9}
                strokeDasharray="3 7"
                opacity={0.35}
                style={{ stroke: 'var(--ink)' }}
              />
            </svg>
            <div
              data-ref="bottle"
              role="img"
              aria-label="Frasco hexagonal de rubor en crema de 5 gramos con tapa rosada"
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <img
                src={RUBOR_CREMA_IMGS[SHADES[shade].id]}
                alt={SHADES[shade].id}
                className="h-full w-auto object-contain drop-shadow-xl"
                style={{ maxHeight: 'var(--H)' }}
              />
            </div>
          </div>
        </div>

        {/* Progress */}
        <nav
          aria-label="Capítulos del producto"
          className="absolute right-0 top-1/2 z-[4] grid -translate-y-1/2 gap-2 max-[760px]:hidden"
        >
          {CHAPTER_CENTERS.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={CHAPTER_LABELS[i]}
              title={CHAPTER_LABELS[i]}
              onClick={() => go(c)}
              className={`clip-hex h-4 w-3.5 border-0 p-0 transition duration-200 ${
                active === i ? 'scale-[1.35] bg-ink' : 'bg-line'
              }`}
            />
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 z-[4] h-[3px] bg-line" aria-hidden="true">
          <i data-ref="bar" className="block h-full origin-left scale-x-0 bg-shade" />
        </div>
      </div>
    </section>
  )
}
