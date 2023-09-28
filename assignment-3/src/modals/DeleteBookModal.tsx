import React, { useCallback, useContext, useEffect } from 'react'
import { ModalDeleteContext } from '../util/context/modalDeleteContext'
import { BooksContext } from '../util/context/booksDataContext'
import { BooksViewContext } from '../util/context/bookViewContext'
import { ThemeContext } from '../util/context/themeContext'

function DeleteBookModal() {
  const modalDeleteContext = React.useContext(ModalDeleteContext)
  const { books, setBooks, searchedBookList, setSearchedBookList } =
    useContext(BooksContext)
  const { currentView, currentPage, setCurrentPage, maxView } =
    useContext(BooksViewContext)
  const { deleteItem, setDeleteItem } = modalDeleteContext
  const { theme } = useContext(ThemeContext)

  const handleCloseByEsc = useCallback(
    (ev) => {
      ev.stopPropagation()
      if (ev.keyCode === 27) {
        setDeleteItem(undefined)
      }
    },
    [setDeleteItem],
  )
  useEffect(() => {
    document.addEventListener('keydown', (ev) => handleCloseByEsc(ev))
    return () =>
      document.removeEventListener('keydown', (ev) => handleCloseByEsc(ev))
  }, [handleCloseByEsc])

  const handleClose = (ev) => {
    ev.stopPropagation()
    if (ev.currentTarget === ev.target) {
      setDeleteItem(undefined)
    }
  }
  const handleDelete = () => {
    const { id } = deleteItem!
    const newList = books.filter((item) => item.id !== id)
    setBooks(newList)
    setDeleteItem(undefined)
    if (newList.length > 0)
      localStorage.setItem('currentData', JSON.stringify(newList))
    if (currentView.length < maxView && searchedBookList!.length > 0) {
      const newCurrentView = searchedBookList!.filter((item) => item.id !== id)
      setSearchedBookList([...newCurrentView])
    }
    if (currentView.length === 1) {
      const cur = currentPage
      setCurrentPage(cur - 1)
    }
  }

  return (
    <div
      className="overlay"
      id="delete-modal-overlay"
      onClick={handleClose}
      role="presentation"
    >
      <aside
        className={`modal ${theme === 'dark' && 'dark'}`}
        id="deleteBookModal"
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
        <article>
          <h2>Delete book</h2>
          <p>
            Do you want to delete{' '}
            <mark className={`delete-name ${theme === 'dark' && 'dark'}`}>
              {deleteItem!.name}
            </mark>
            .
          </p>
          <div id="button-group">
            <button
              type="button"
              id="delete-button"
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className={`primary standard-height-element closeable-element ${
                theme === 'dark' && 'dark'
              }`}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </article>
      </aside>
    </div>
  )
}

export default DeleteBookModal
