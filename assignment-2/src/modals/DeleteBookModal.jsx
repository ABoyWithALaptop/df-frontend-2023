import React, { useContext, useEffect } from 'react'
import { ModalDeleteContext } from '../util/context/modalDeleteContext'
import { BooksContext } from '../util/context/booksDataContext'
import { BooksViewContext } from '../util/context/bookViewContext'

function DeleteBookModal() {

  const modalDeleteContext = React.useContext(ModalDeleteContext)
  const { books, setBooks, searchedBookList, setSearchedBookList } = useContext(BooksContext)
  const { currentView, maxView } = useContext(BooksViewContext)
  const { deleteItem,setDeleteItem } = modalDeleteContext
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
  }

  return (
    <div className="overlay" id="deleteBookModalOverlay">
				<aside className="modal" id="deleteBookModal">
					<button type="button" className="closeBut closeAct" onClick={handleClose}>&times;</button>
					<article>
						<h2>Delete book</h2>
          <p>Do you want to delete <mark className="deleteName">{deleteItem.name }</mark>.</p>
						<div id="butGrp">
							<button type="button" id="deleteBut" className="stdHeight" onClick={handleDelete}>
								Delete
							</button>
							<button type="button" className="primary stdHeight closeAct"onClick={handleClose}>
								Cancel
							</button>
						</div>
					</article>
				</aside>
			</div>
  )
}

export default DeleteBookModal