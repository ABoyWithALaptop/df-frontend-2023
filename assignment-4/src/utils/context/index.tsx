'use client'

import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { ModalAddContext } from './modalAddContext'
import { ModalDeleteContext } from './modalDeleteContext'
import { BooksViewContext } from './bookViewContext'
import { BooksContext } from './booksDataContext'
import { book } from '../types'

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

export const ContextProvider = ({ children }: PropsWithChildren) => {
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
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const valueAdd = useMemo(
    () => ({ isModalAddOpen, setIsModalAddOpen }),
    [isModalAddOpen],
  )
  const [deleteItem, setDeleteItem] = useState<book | undefined>(undefined)
  const valueDelete = useMemo(
    () => ({ deleteItem, setDeleteItem }),
    [deleteItem],
  )
  const [currentView, setCurrentView] = useState<book[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
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
  const [books, setBooks] = useState<book[]>([])
  const [searchedBookList, setSearchedBookList] = useState<book[] | undefined>(
    [],
  )
  const [searchValue, setSearchValue] = useState<string>('')
  const valuesBooksContext = useMemo(() => {
    return {
      books,
      setBooks,
      searchedBookList,
      setSearchedBookList,
      searchValue,
      setSearchValue,
    }
  }, [books, searchedBookList, searchValue])
  return (
    <BooksContext.Provider value={valuesBooksContext}>
      <ModalAddContext.Provider value={valueAdd}>
        <ModalDeleteContext.Provider value={valueDelete}>
          <BooksViewContext.Provider value={valueCurrentView}>
            {children}
          </BooksViewContext.Provider>
        </ModalDeleteContext.Provider>
      </ModalAddContext.Provider>
    </BooksContext.Provider>
  )
}
