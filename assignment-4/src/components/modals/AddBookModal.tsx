import React, { useContext, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BooksContext } from '../../utils/context/booksDataContext'
import { BooksViewContext } from '../../utils/context/bookViewContext'
import { removeAccents } from '../../utils/functions'
import closeModal from '../../utils/hooks/closeModalHook'

function AddBookModal({
  setIsModalAddOpen,
}: {
  setIsModalAddOpen: (status: boolean) => void
}) {
  const [name, setName] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [topic, setTopic] = React.useState('Database')
  const { books, setBooks, setSearchedBookList, searchValue } =
    useContext(BooksContext)
  const { currentView, maxView } = useContext(BooksViewContext)
  const { theme } = useTheme()
  const closeModalData = {
    type: '',
    setStatus: setIsModalAddOpen as (status: boolean | undefined) => void,
  }
  const handleCloseEsc = closeModal({
    ...closeModalData,
    type: 'esc',
  })

  useEffect(() => {
    document.addEventListener('keydown', handleCloseEsc)
    return () => document.removeEventListener('keydown', handleCloseEsc)
  }, [handleCloseEsc])

  const handleClose = closeModal({
    ...closeModalData,
    type: 'click',
  })
  const handleAdd = (ev) => {
    ev.preventDefault()
    const id = books.length + 1
    const newList = [
      ...books,
      { id, name, author, topic, pureName: name.toLowerCase() },
    ]
    setBooks(newList)
    setIsModalAddOpen(false)
    localStorage.setItem('currentData', JSON.stringify(newList))
    if (currentView.length < maxView) {
      const item = { id, name, author, topic, pureName: name.toLowerCase() }
      if (
        removeAccents(item.pureName).includes(
          removeAccents(searchValue.toLowerCase()),
        )
      )
        setSearchedBookList([
          ...currentView,
          { id, name, author, topic, pureName: name.toLowerCase() },
        ])
    }
  }

  return (
    <div
      className="overlay"
      id="add-book-modal-overlay"
      onClick={(ev) => {
        if (ev.currentTarget === ev.target) handleClose(ev)
      }}
      role="presentation"
    >
      <aside
        className={`modal ${theme === 'dark' && 'dark'}`}
        id="addBookModal"
      >
        <button
          type="button"
          className={`close-button closeable-element ${
            theme === 'dark' && 'dark'
          }`}
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold">Add book</h2>
        <form name="addBookModalForm" onSubmit={handleAdd}>
          <label htmlFor="nameBook">
            Name
            <input
              type="text"
              id="nameBook"
              className="standard-height-element w-full py-3 px-5 my-2 block border-2 border-tertiary-color rounded box-border dark:bg-primary-color-dark dark:border-tertiary-color"
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>

          <label htmlFor="authorBook">
            Author
            <input
              type="text"
              id="authorBook"
              className="standard-height-element w-full py-3 px-5 my-2 block border-2 border-tertiary-color rounded box-border dark:bg-primary-color-dark dark:border-tertiary-color"
              required
              value={author}
              onChange={(e) => setAuthor(e.currentTarget.value)}
            />
          </label>

          <label htmlFor="topicBook">
            Topic
            <select
              name="topicBook"
              id="topicBook"
              title="topicBook"
              className="standard-height-element w-full py-3 px-5 my-2 block border-2 border-tertiary-color rounded box-border dark:bg-primary-color-dark dark:border-tertiary-color"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="Programing" className="topicOption">
                Programing
              </option>
              <option value="Database" className="topicOption">
                Database
              </option>
              <option value="Devops" className="topicOption">
                Devops
              </option>
            </select>
          </label>

          <button
            type="submit"
            className={`primary standard-height-element ${
              theme === 'dark' && 'dark'
            }`}
          >
            Create
          </button>
        </form>
      </aside>
    </div>
  )
}

export default AddBookModal
