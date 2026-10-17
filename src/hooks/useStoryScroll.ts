import { useEffect, useRef, type RefObject } from 'react'
import { SHADES } from '../data'

type Range = [number, number, number, number]

/** Each chapter: fade in from [0] to [1], hold until [2], fade out by [3] (scroll progress 0..1). */
export const RANGES: Range[] = [
  [-1, -1, 0.13, 0.18],
  [0.19, 0.23, 0.36, 0.4],
  [0.42, 0.46, 0.6, 0.64],
  [0.66, 0.7, 0.82, 0.86],
  [0.88, 0.92, 2, 3],
]
export const CHAPTER_CENTERS = [0.02, 0.29, 0.53, 0.76, 0.96]
export const CHAPTER_LABELS = ['Inicio', 'Fórmula', 'Tonos', 'Aplicación', 'Ficha']

const SHADE_START = 0.43
const SHADE_STEP = 0.05

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (t: number) => t * t * (3 - 2 * t)

function keys(k: [number, number][], p: number) {
  if (p <= k[0][0]) return k[0][1]
  for (let i = 1; i < k.length; i++) {
    if (p <= k[i][0]) {
      const a = k[i - 1]
      const b = k[i]
      return a[1] + (b[1] - a[1]) * ease((p - a[0]) / (b[0] - a[0]))
    }
  }
  return k[k.length - 1][1]
}

function vis(r: Range, p: number) {
  if (p < r[0]) return 0
  if (p < r[1]) return (p - r[0]) / (r[1] - r[0])
  if (p <= r[2]) return 1
  if (p < r[3]) return 1 - (p - r[2]) / (r[3] - r[2])
  return 0
}

function measure(story: HTMLElement, pin: HTMLElement) {
  const rect = story.getBoundingClientRect()
  const top = parseFloat(getComputedStyle(pin).top) || 0
  const span = rect.height - pin.offsetHeight
  return { rect, top, span }
}

/** Smooth-scrolls the page to a point (0..1) of the pinned product story. */
export function scrollToProgress(story: HTMLElement | null, p: number) {
  const pin = story?.querySelector<HTMLElement>('[data-ref="pin"]')
  if (!story || !pin) return
  const { rect, top, span } = measure(story, pin)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: window.scrollY + rect.top - top + p * span, behavior: reduce ? 'auto' : 'smooth' })
}

type Callbacks = { onActive: (i: number) => void; onShade: (i: number) => void }

/**
 * Drives the pinned product scene from scroll position. Per-frame values are written straight to the
 * DOM (no React re-render); React state only changes when the active chapter or shade changes.
 */
export function useStoryScroll(rootRef: RefObject<HTMLElement>, cb: Callbacks) {
  const cbRef = useRef(cb)
  cbRef.current = cb

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const q = <T extends Element>(n: string) => root.querySelector<T>(`[data-ref="${n}"]`)!
    const pin = q<HTMLElement>('pin')
    const bottle = q<HTMLElement>('bottle')
    const plate = q<SVGElement>('plate')
    const r1 = q<SVGElement>('r1')
    const r2 = q<SVGElement>('r2')
    const glow = q<HTMLElement>('glow')
    const bar = q<HTMLElement>('bar')
    const smearA = q<SVGElement>('smearCore')
    const smearB = q<SVGElement>('smearBlur')
    const dab = q<SVGElement>('dab')
    const l1 = q<SVGElement>('l1')
    const l2 = q<SVGElement>('l2')
    const l3 = q<SVGElement>('l3')
    const chs = Array.from(root.querySelectorAll<HTMLElement>('[data-ch]'))
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'))

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const raw = () => {
      const { rect, top, span } = measure(root, pin)
      return span > 0 ? clamp((top - rect.top) / span) : 0
    }

    let ps = raw()
    const t0 = performance.now()
    let lastShade = -1
    let lastActive = -1
    const on = chs.map(() => false)
    let raf = 0

    const frame = (now: number) => {
      const target = raw()
      ps = reduce ? target : ps + (target - ps) * 0.14
      if (Math.abs(target - ps) < 0.0004) ps = target
      const p = ps

      // chapters: crossfade with a small vertical drift
      let active = 0
      let best = -1
      chs.forEach((el, i) => {
        const v = vis(RANGES[i], p)
        const dir = p > RANGES[i][2] ? -1 : 1
        el.style.opacity = v.toFixed(3)
        el.style.transform = `translate3d(0, ${((1 - v) * 26 * dir).toFixed(1)}px, 0)`
        const visible = v > 0.04
        if (visible !== on[i]) {
          on[i] = visible
          el.dataset.on = String(visible)
          el.setAttribute('aria-hidden', String(!visible))
        }
        if (v > best) {
          best = v
          active = i
        }
      })
      if (active !== lastActive) {
        lastActive = active
        cbRef.current.onActive(active)
      }
      bar.style.transform = `scaleX(${p.toFixed(4)})`

      // product: tilt, scale and float
      const intro = reduce ? 1 : clamp((now - t0) / 1500)
      const ie = 1 - ease(intro)
      const fl = reduce ? 0 : Math.sin(now / 1300) * 7
      const fr = reduce ? 0 : Math.sin(now / 2100) * 0.7
      const bs = keys([[0, 1], [0.2, 1.03], [0.4, 1.1], [0.62, 1], [0.82, 1.07], [1, 1]], p)
      const br = keys([[0, 0], [0.2, -3], [0.4, 5], [0.62, -7], [0.82, 2], [1, 0]], p) + fr
      const bry = keys([[0, 0], [0.2, -12], [0.4, 14], [0.62, -9], [0.82, 7], [1, 0]], p)
      const by = keys([[0, 0], [0.4, -12], [0.62, 8], [1, 0]], p) + fl + ie * 70
      bottle.style.transform = `perspective(900px) translate3d(0, ${by.toFixed(1)}px, 0) rotateY(${bry.toFixed(1)}deg) rotate(${br.toFixed(2)}deg) scale(${bs.toFixed(3)})`
      bottle.style.opacity = intro < 1 ? clamp(intro * 2.4).toFixed(2) : '1'
      plate.style.transform = `rotate(${(p * 60).toFixed(2)}deg)`
      r1.style.transform = `rotate(${(p * 120).toFixed(2)}deg)`
      r2.style.transform = `rotate(${(-p * 90).toFixed(2)}deg)`
      glow.style.opacity = keys([[0, 0.35], [0.4, 0.55], [0.55, 0.95], [0.8, 0.6], [1, 0.5]], p).toFixed(2)

      // shade follows chapter 3
      let si = 0
      if (p >= SHADE_START && p <= 0.645) si = clamp(Math.floor((p - SHADE_START) / SHADE_STEP), 0, 3)
      if (si !== lastShade) {
        lastShade = si
        document.documentElement.style.setProperty('--shade', SHADES[si].c)
        cbRef.current.onShade(si)
      }

      // chapter 2: the colour stroke draws itself
      const off = (1 - ease(clamp((p - 0.2) / 0.14))).toFixed(3)
      smearA.setAttribute('stroke-dashoffset', off)
      smearB.setAttribute('stroke-dashoffset', off)

      // chapter 4: steps appear one by one and the cheek fills with colour
      const s = [0, 1, 2].map((k) => ease(clamp((p - (0.665 + k * 0.045)) / 0.035)))
      steps.forEach((li, k) => {
        li.style.opacity = (0.25 + 0.75 * s[k]).toFixed(2)
        li.style.transform = `translateX(${((1 - s[k]) * -10).toFixed(1)}px)`
      })
      dab.setAttribute('opacity', (s[0] * (1 - s[1] * 0.8)).toFixed(2))
      l1.setAttribute('opacity', s[1].toFixed(2))
      l1.style.transform = `scale(${(0.4 + 0.6 * s[1]).toFixed(2)})`
      l2.setAttribute('opacity', (s[2] * 0.7).toFixed(2))
      l2.style.transform = `scale(${(0.4 + 0.6 * s[2]).toFixed(2)})`
      l3.setAttribute('opacity', (s[2] * 0.55).toFixed(2))
      l3.style.transform = `scale(${(0.4 + 0.6 * s[2]).toFixed(2)})`

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [rootRef])
}

export const SHADE_SCROLL = { start: SHADE_START, step: SHADE_STEP }
