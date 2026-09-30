const MIN_SCALE = 1
const MAX_SCALE = 4
const STEP = 0.1

export function createImageZoom(imgEl, wrapperEl) {
  let scale = 1
  let origin = { x: 0, y: 0 }
  let panning = false
  let startX = 0
  let startY = 0
  let currentX = 0
  let currentY = 0
  let pointers = []
  let startDist = 0

  function reset() {
    scale = 1
    origin = { x: 0, y: 0 }
    imgEl.style.transform = 'translate(0, 0) scale(1)'
  }

  function apply() {
    imgEl.style.transform = `translate(${origin.x}px, ${origin.y}px) scale(${scale})`
  }

  function pinchStart(p1, p2) {
    return Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY)
  }

  function onPointerDown(e) {
    if (e.pointerType === 'touch' && e.touches && e.touches.length === 2) {
      pointers = Array.from(e.touches)
      startDist = pinchStart(pointers[0], pointers[1])
      return
    }
    if (e.button !== 0 && e.pointerType !== 'touch') return
    panning = true
    startX = e.clientX
    startY = e.clientY
    currentX = origin.x
    currentY = origin.y
    imgEl.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    if (pointers.length === 2) {
      const newPointers = [
        e.touches ? e.touches[0] : null,
        e.touches ? e.touches[1] : null
      ].filter(Boolean)
      if (newPointers.length < 2) return
      const dist = Math.hypot(
        newPointers[0].clientX - newPointers[1].clientX,
        newPointers[0].clientY - newPointers[1].clientY
      )
      if (!startDist) return
      const delta = dist / startDist
      scale = Math.min(Math.max(MIN_SCALE, scale * delta), MAX_SCALE)
      startDist = dist
      apply()
      return
    }
    if (!panning) return
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    origin.x = currentX + dx
    origin.y = currentY + dy
    apply()
  }

  function onPointerUp(e) {
    if (pointers.length === 2) {
      pointers = []
      startDist = 0
      return
    }
    if (e.pointerType !== 'touch') {
      panning = false
      imgEl.releasePointerCapture(e.pointerId)
    }
  }

  function onDoubleClick(e) {
    e.stopPropagation()
    if (scale > MIN_SCALE) {
      reset()
    } else {
      scale = 2
      origin = {
        x: wrapperEl.clientWidth / 2 - imgEl.offsetWidth / 2,
        y: wrapperEl.clientHeight / 2 - imgEl.offsetHeight / 2
      }
      apply()
    }
  }

  function onWheel(e) {
    if (!(e.ctrlKey || e.metaKey)) return
    e.preventDefault()
    scale = Math.min(Math.max(MIN_SCALE, scale + (e.deltaY < 0 ? STEP : -STEP)), MAX_SCALE)
    apply()
  }

  imgEl.addEventListener('pointerdown', onPointerDown)
  imgEl.addEventListener('pointermove', onPointerMove, { passive: true })
  imgEl.addEventListener('pointerup', onPointerUp)
  imgEl.addEventListener('pointercancel', () => {
    panning = false
    pointers = []
    startDist = 0
  })
  imgEl.addEventListener('dblclick', onDoubleClick)
  imgEl.addEventListener('dbltouchend', (e) => {
    e.preventDefault()
    onDoubleClick(e)
  })
  imgEl.addEventListener('wheel', onWheel, { passive: false })

  return { reset, apply, get scale() { return scale } }
}
