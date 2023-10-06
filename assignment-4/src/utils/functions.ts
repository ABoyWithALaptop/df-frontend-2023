export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
export const closeModal = ({
  type,
  setStatus,
}: {
  type: 'esc' | 'click'
  setStatus: (params: boolean | undefined) => void
}) => {
  if (type === 'esc') {
    return (ev) => {
      if (ev.key === 'Escape') {
        setStatus(undefined)
      }
    }
  }

  return (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    if (ev.currentTarget === ev.target) {
      setStatus(false)
    }
  }
}
