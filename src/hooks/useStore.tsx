import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { SHADES, WHATSAPP, money } from '../data'

export type BagItem = { key: string; n: string; p: number; shade: number | null; q: number }

type Store = {
  items: BagItem[]
  count: number
  total: number
  add: (item: Omit<BagItem, 'q'>) => void
  change: (index: number, delta: number) => void
  remove: (index: number) => void
  orderText: string
  whatsappHref: string
  bagOpen: boolean
  openBag: () => void
  closeBag: () => void
  toastMsg: string
  toastOn: boolean
  toast: (msg: string) => void
}

const Ctx = createContext<Store | null>(null)
const KEY = 'elaya-bag'

function load(): BagItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    if (!Array.isArray(raw)) return []
    return raw.filter((i) => i && typeof i.key === 'string' && i.p > 0 && i.q > 0)
  } catch {
    return []
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>(load)
  const [bagOpen, setBagOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastOn, setToastOn] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* storage can be blocked; the bag still works for this visit */
    }
  }, [items])

  const toast = useCallback((msg: string) => {
    setToastMsg(msg)
    setToastOn(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToastOn(false), 1800)
  }, [])

  const add: Store['add'] = useCallback((item) => {
    setItems((cur) => {
      const found = cur.find((x) => x.key === item.key)
      if (found) return cur.map((x) => (x.key === item.key ? { ...x, q: x.q + 1 } : x))
      return [...cur, { ...item, q: 1 }]
    })
  }, [])

  const change = useCallback((index: number, delta: number) => {
    setItems((cur) => cur.map((x, i) => (i === index ? { ...x, q: x.q + delta } : x)).filter((x) => x.q > 0))
  }, [])

  const remove = useCallback((index: number) => {
    setItems((cur) => cur.filter((_, i) => i !== index))
  }, [])

  const value = useMemo<Store>(() => {
    const count = items.reduce((a, i) => a + i.q, 0)
    const total = items.reduce((a, i) => a + i.p * i.q, 0)
    const lines = items.map(
      (i) => `- ${i.q} x ${i.n}${i.shade !== null ? ` (${SHADES[i.shade].id})` : ''} - ${money(i.p * i.q)}`,
    )
    const orderText = items.length
      ? `Hola Elaya, quiero pedir:\n${lines.join('\n')}\nTotal: ${money(total)}\nMi ciudad: `
      : ''
    return {
      items,
      count,
      total,
      add,
      change,
      remove,
      orderText,
      whatsappHref: items.length ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(orderText)}` : '#',
      bagOpen,
      openBag: () => setBagOpen(true),
      closeBag: () => setBagOpen(false),
      toastMsg,
      toastOn,
      toast,
    }
  }, [items, bagOpen, toastMsg, toastOn, add, change, remove, toast])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore must be used inside StoreProvider')
  return v
}
