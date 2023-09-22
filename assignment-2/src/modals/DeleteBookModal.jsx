import React, { useContext, useEffect } from 'react'
import { ModalDeleteContext } from '../util/context/modalDeleteContext'
import { BooksContext } from '../util/context/booksDataContext'
import { BooksViewContext } from '../util/context/bookViewContext'
import { ThemeContext } from '../util/context/ThemeContext'

function DeleteBookModal() {

  const modalDeleteContext = React.useContext(ModalDeleteContext)
  const { books, setBooks, searchedBookList, setSearchedBookList } = useContext(BooksContext)
  const { currentView,currentPage, setCurrentPage, maxView } = useContext(BooksViewContext)
  const { deleteItem, setDeleteItem } = modalDeleteContext
  const{theme} = useContext(ThemeContext)
  useEffect(() => {
    const handleCloseEsc = (ev) => {
      ev.stopPropagation()
      if (ev.keyCode === 27) {
        setDeleteItem(null)
      }
    }
    document.addEventListener("keydown", handleCloseEsc)
    return () => document.removeEventListener("keydown", handleCloseEsc)
  }, [])

  const handleClose = (ev) => {
    ev.stopPropagation()
    if (ev.currentTarget === ev.target) {
      setDeleteItem(null)
    }

  }
  const handleDelete = () => { 
    const id = deleteItem.id
    const newList = books.filter(item => item.id !== id)
    const newCurrentView = searchedBookList.length>0&& searchedBookList.filter(item => item.id !== id)
    setBooks(newList)
    setDeleteItem(null)
    newList.length > 0 && localStorage.setItem("currentData", JSON.stringify(newList));
    if (currentView.length < maxView && searchedBookList.length>0) { 
      setSearchedBookList([...newCurrentView])
    }
    if (currentView.length === 1) {
      const cur = currentPage
      setCurrentPage(cur-1)
    }
  }

  return (
    <div className="overlay" id="deleteBookModalOverlay">
				<aside className={`modal ${theme==='dark'&&"dark"}`} id="deleteBookModal">
					<button type="button" className={`closeBut closeAct ${theme==='dark'&&"dark"}`} onClick={handleClose}>&times;</button>
					<article>
						<h2>Delete book</h2>
          <p>Do you want to delete <mark className={`deleteName ${theme==='dark'&&"dark"}`}>{deleteItem.name }</mark>.</p>
						<div id="butGrp">
							<button type="button" id="deleteBut" className={`stdHeight ${theme==='dark'&&"dark"}`} onClick={handleDelete}>
								Delete
							</button>
							<button type="button" className={`primary stdHeight closeAct ${theme==='dark'&&"dark"}`} onClick={handleClose}>
								Cancel
							</button>
						</div>
					</article>
				</aside>
			</div>
  )
}

export default DeleteBookModal