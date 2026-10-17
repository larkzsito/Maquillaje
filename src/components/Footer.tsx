export default function Footer() {
  return (
    <footer className="border-t border-line pb-[3.2rem] pt-[2.4rem] text-[.88rem] text-ink2">
      <div className="grid max-w-[52rem] gap-3">
        <p>
          Página independiente hecha con información pública. No es el sitio oficial de Elaya Belleza. Precios en COP
          tomados de{' '}
          <a href="https://elayabelleza.com/" target="_blank" rel="noopener" className="font-semibold text-ink">
            elayabelleza.com
          </a>{' '}
          en octubre de 2026; pueden cambiar. Los colores de los tonos son aproximados.
        </p>
        <p>
          La bolsa de esta página no procesa pagos. Al pedir por WhatsApp, la marca confirma disponibilidad, envío y
          forma de pago.
        </p>
      </div>
    </footer>
  )
}
