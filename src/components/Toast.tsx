import { useStore } from '../hooks/useStore'

export default function Toast() {
  const { toastMsg, toastOn } = useStore()
  return (
    <div
      role="status"
      className={`fixed bottom-[calc(1.4rem+env(safe-area-inset-bottom,0px))] left-1/2 z-[90] max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-[.92rem] font-semibold text-bg transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
        toastOn ? 'translate-y-0' : 'translate-y-[calc(100%+3rem)]'
      }`}
    >
      {toastMsg}
    </div>
  )
}
