export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
export const closeModalClick = (
  ev: React.MouseEvent,
  setStatus: (params: boolean | undefined) => void,
) => {
  ev.preventDefault()
  ev.stopPropagation()
  if (ev.currentTarget === ev.target) {
    setStatus(false)
  }
}
export const closeModalEsc = (
  ev: KeyboardEvent,
  setStatus: (params: boolean | undefined) => void,
) => {
  if (ev.key === 'Escape') {
    setStatus(undefined)
  }
}

export const between = (value: number, min: number, max: number) => {
  return value >= min && value <= max
}
