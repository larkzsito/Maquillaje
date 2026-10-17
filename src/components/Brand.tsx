const CATEGORIES = [
  { title: 'Rostro', items: ['Bases y prebases', 'Correctores', 'Rubores', 'Iluminadores', 'Polvos', 'Paletas'] },
  { title: 'Ojos', items: ['Sombras', 'Cejas', 'Delineadores', 'Pestañinas'] },
  { title: 'Labios', items: ['Labiales', 'Brillos', 'Tintas'] },
]

const LINKS: { href: string; label: string }[] = []

const title = 'font-soft text-[clamp(2.4rem,5.6vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-balance'

export default function Brand() {
  return (
    <section
      id="marca"
      className="scroll-mt-header mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-start gap-[clamp(2rem,6vw,6rem)] border-t border-line py-[clamp(4rem,9vw,8rem)] max-[860px]:grid-cols-1"
    >
      <div>
        <h2 className={title}>Maquillaje Premium</h2>
        <p className="font-soft mt-6 max-w-[24rem] text-[clamp(1.3rem,2.2vw,1.75rem)] italic leading-[1.3]">
          Explorar y reinventarse. Se trata de sentirnos bien en nuestra piel.
        </p>
      </div>

      <div>
        <p className="max-w-[36rem] text-ink2">
          Soy distribuidor autorizado de esta línea de maquillaje premium. Todos los productos son originales y se
          entregan directamente a tu puerta. Hago pedidos a todo el país con confirmación por WhatsApp.
        </p>

        <div className="mt-9 grid grid-cols-3 gap-[1.6rem] max-[860px]:grid-cols-2 max-[420px]:grid-cols-1">
          {CATEGORIES.map((c) => (
            <div key={c.title}>
              <h3 className="font-soft mb-3 text-[1.35rem] font-medium leading-[1.02] tracking-[-0.02em]">{c.title}</h3>
              <ul className="m-0 grid list-none gap-1 p-0 text-[.98rem] text-ink2">
                {c.items.map((i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="clip-hex h-2.5 w-[9px] flex-none bg-rose" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-[1.6rem] border-t border-line pt-7 text-[.96rem] max-[760px]:grid-cols-1">
          <div>
            <h3 className="font-soft mb-2 text-[1.15rem] font-medium leading-[1.02] tracking-[-0.02em]">Dónde encontrarla</h3>
            <p className="text-ink2">Showroom Medellín: Cra 52A # 45-33, oficina 601, Centro Comercial Dorado #2.</p>
            <p className="mt-2 text-ink2">Tienda Bogotá: Carrera 13 # 11-96, Local 23, C.C. D Todo Accesorios.</p>
          </div>
          <div>
            <h3 className="font-soft mb-2 text-[1.15rem] font-medium leading-[1.02] tracking-[-0.02em]">Contacto</h3>
            <p className="text-ink2">
              WhatsApp <span className="select-all font-semibold text-ink">315 7154772</span>
            </p>
            <p className="text-ink2">
              Escríbeme directamente por WhatsApp para hacer tu pedido. Envío a todo el país.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-x-[1.2rem] gap-y-2">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className="font-semibold text-rose-deep">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
