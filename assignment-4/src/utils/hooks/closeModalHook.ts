const closeModal = ({
  type,
  setStatus,
}: {
  type: 'esc' | 'click'
  setStatus: (params: boolean | undefined) => void
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(status)
  if (type === 'esc') {
    return (ev) => {
      if (ev.key === 'Escape') {
        setStatus(undefined)
      }
    }
  }
  if (type === 'click') {
    return (ev) => {
      ev.preventDefault()
      setStatus(false)
    }
  }
  return (ev) => {
    ev.stopPropagation()
    setStatus(false)
  }
}

export default closeModal
