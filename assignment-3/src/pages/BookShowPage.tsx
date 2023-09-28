import React, { useEffect, useMemo, useState } from 'react'
import ControlBar from '../components/SearchingBar'
import TableBooks from '../components/TableBooks'
import AddBookModal from '../modals/AddBookModal'
import { ModalAddContext } from '../util/context/modalAddContext'
import PaginationWrapper from '../components/Pagination/PaginationWrapper'
import DeleteBookModal from '../modals/DeleteBookModal'
import { ModalDeleteContext } from '../util/context/modalDeleteContext'
import { BooksViewContext } from '../util/context/bookViewContext'
import { BooksContext } from '../util/context/booksDataContext'
import { book } from '../util/type'

const initBooks: book[] = [
  {
    id: 1,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
    pureName: 'refactoring',
  },
  {
    id: 2,
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
    pureName: 'designing data-intensive applications',
  },
  {
    id: 3,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'Devops',
    pureName: 'the phoenix project',
  },
  {
    id: 4,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
    pureName: 'refactoring',
  },
  {
    id: 5,
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
    pureName: 'designing data-intensive applications',
  },
  {
    id: 6,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'Devops',
    pureName: 'the phoenix project',
  },
]

function BookShowPage() {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState<book | undefined>(undefined)
  const [books, setBooks] = useState<book[]>([])
  const [currentView, setCurrentView] = useState<book[]>([])
  const [searchedBookList, setSearchedBookList] = useState<book[] | undefined>(
    [],
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const localDataJson = localStorage.getItem('currentData')
    if (localDataJson !== null) {
      const curBooks = JSON.parse(localDataJson)
      setBooks(curBooks)
    } else {
      localStorage.setItem('currentData', JSON.stringify(initBooks))
      setBooks(initBooks)
    }
  }, [])
  const valueAdd = useMemo(
    () => ({
      isModalAddOpen,
      setIsModalAddOpen,
    }),
    [isModalAddOpen],
  )
  const valueDelete = useMemo(
    () => ({ deleteItem, setDeleteItem }),
    [deleteItem],
  )
  const valueBooks = useMemo(
    () => ({
      books,
      setBooks,
      searchedBookList,
      setSearchedBookList,
      searchValue,
      setSearchValue,
    }),
    [books, searchedBookList, searchValue],
  )
  const valueCurrentView = useMemo(
    () => ({
      currentView,
      setCurrentView,
      currentPage,
      setCurrentPage,
      maxView: 5,
    }),
    [currentView, currentPage],
  )
  return (
    <BooksContext.Provider value={valueBooks}>
      <BooksViewContext.Provider value={valueCurrentView}>
        <ModalAddContext.Provider value={valueAdd}>
          <ModalDeleteContext.Provider value={valueDelete}>
            <section>
              <ControlBar />
              <PaginationWrapper data={books}>
                <TableBooks />
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
