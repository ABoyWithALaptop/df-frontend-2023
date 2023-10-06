import React, { useContext, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ModalDeleteContext } from '../../utils/context/modalDeleteContext'
import { BooksContext } from '../../utils/context/booksDataContext'
import { BooksViewContext } from '../../utils/context/bookViewContext'
import { closeModal } from '../../utils/functions'

function DeleteBookModal() {
  const modalDeleteContext = React.useContext(ModalDeleteContext)
  const { books, setBooks, searchedBookList, setSearchedBookList } =
    useContext(BooksContext)
  const { currentView, currentPage, setCurrentPage, maxView } =
    useContext(BooksViewContext)
  const { deleteItem, setDeleteItem } = modalDeleteContext
  const { theme } = useTheme()
  const closeModalData = {
    type: '',
    setStatus: setDeleteItem as (status: boolean | undefined) => void,
  }

  const handleCloseByEsc = closeModal({
    ...closeModalData,
    type: 'esc',
  })
  useEffect(() => {
    document.addEventListener('keydown', (ev) => handleCloseByEsc(ev))
    return () =>
      document.removeEventListener('keydown', (ev) => handleCloseByEsc(ev))
  }, [handleCloseByEsc])

  const handleClose = closeModal({
    ...closeModalData,
    type: 'click',
  })
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
      onClick={(ev) => {
        handleClose(ev)
      }}
      role="presentation"
    >
      <aside
        className={`modal ${theme === 'dark' && 'dark'}`}
        id="deleteBookModal"
      >
        <button
          type="button"
          className="close-button closeable-element"
          onClick={handleClose}
        >
          &times;
        </button>
        <article>
          <h2 className="text-xl font-bold">Delete book</h2>
          <p>
            Do you want to delete{' '}
            <mark className={`delete-name `}>{deleteItem!.name}</mark>.
          </p>
          <div id="button-group">
            <button
              type="button"
              id="delete-button"
              className={`standard-height-element dark:text-primary-color-dark `}
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
