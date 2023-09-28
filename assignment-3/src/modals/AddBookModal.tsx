import React, { useCallback, useContext, useEffect } from 'react'
import { ModalAddContext } from '../util/context/modalAddContext'
import { BooksContext } from '../util/context/booksDataContext'
import { BooksViewContext } from '../util/context/bookViewContext'
import { ThemeContext } from '../util/context/themeContext'
import { removeAccents } from '../util/functions'

function AddBookModal() {
  const [name, setName] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [topic, setTopic] = React.useState('Database')
  const modalAddContext = useContext(ModalAddContext)
  const { books, setBooks, setSearchedBookList, searchValue } =
    useContext(BooksContext)
  const { currentView, maxView } = useContext(BooksViewContext)
  const { setIsModalAddOpen } = modalAddContext
  const { theme } = useContext(ThemeContext)
  const handleCloseEsc = useCallback(
    (ev) => {
      ev.stopPropagation()
      if (ev.keyCode === 27) {
        setIsModalAddOpen(false)
      }
    },
    [setIsModalAddOpen],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleCloseEsc)
    return () => document.removeEventListener('keydown', handleCloseEsc)
  }, [handleCloseEsc])

  const handleClose = (ev) => {
    ev.stopPropagation()
    if (ev.currentTarget === ev.target) setIsModalAddOpen(false)
  }
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
      onClick={handleClose}
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
        <h2>Add book</h2>
        <form name="addBookModalForm" onSubmit={handleAdd}>
          <label htmlFor="nameBook">
            Name
            <input
              type="text"
              id="nameBook"
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
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
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
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
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
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
