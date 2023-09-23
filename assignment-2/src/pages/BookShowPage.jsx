import React, { useEffect, useState } from 'react'
import ControlBar from '../components/SearchingBar'
import TableBooks from '../components/TableBooks'
import AddBookModal from '../modals/AddBookModal'
import { ModalAddContext } from '../util/context/modalAddContext'
import PaginationWrapper from '../components/Pagination/PaginationWrapper'
import DeleteBookModal from '../modals/DeleteBookModal'
import { ModalDeleteContext } from '../util/context/modalDeleteContext'
import { BooksViewContext } from '../util/context/bookViewContext'
import { BooksContext } from '../util/context/booksDataContext'

const initBooks = [
  {
    id:1,
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Programming",
    pureName: "refactoring"
  },
  {
    id:2,
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
    pureName: "designing data-intensive applications"
  },
  {
    id:3,
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "Devops",
    pureName: "the phoenix project"
  },
  {
    id:4,
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Programming",
    pureName: "refactoring"
  },
  {
    id:5,
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
    pureName: "designing data-intensive applications"
  },
  {
    id:6,
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "Devops",
    pureName: "the phoenix project"
  },
  
]

function BookShowPage() {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [books, setBooks] = useState([])
  const [currentView, setCurrentView] = useState([])
  const [searchedBookList, setSearchedBookList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const valueAdd = { isModalAddOpen, setIsModalAddOpen }
  const valueDelete = { deleteItem, setDeleteItem }
  const valueBooks = { books, setBooks, searchedBookList, setSearchedBookList, searchValue, setSearchValue }
  const valueCurrentView = { currentView, setCurrentView,currentPage, setCurrentPage, maxView: 5 }
  useEffect(() => {
    if (localStorage.getItem("currentData") !== null) {
      const curBooks = JSON.parse(localStorage.getItem("currentData"));
      setBooks(curBooks)
    }
    else {
      localStorage.setItem("currentData", JSON.stringify(initBooks));
      setBooks(initBooks)
    }
  },[])
  return (
    <BooksContext.Provider value = {valueBooks}>
      <BooksViewContext.Provider value={valueCurrentView}>
        <ModalAddContext.Provider value={valueAdd} >
          <ModalDeleteContext.Provider value={valueDelete}>
            <section>
            <ControlBar />
            <PaginationWrapper data={books}>
              <TableBooks/>
            </PaginationWrapper>
          </section>
          {isModalAddOpen && <AddBookModal />}
          {deleteItem && <DeleteBookModal />}
          </ModalDeleteContext.Provider>
        </ModalAddContext.Provider>
      </BooksViewContext.Provider>
    </BooksContext.Provider>
    


  )
}

export default BookShowPage