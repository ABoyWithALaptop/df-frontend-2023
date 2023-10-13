'use client'

import { PropsWithChildren, useMemo, useState } from 'react'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { ModalAddAndEditContext } from './modalAddContext'
import { ModalDeleteContext } from './modalDeleteContext'
import { BooksViewContext } from './bookViewContext'
import { BooksContext } from './booksDataContext'
import { book } from '../types'
import { LoginContext } from './userContext'

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<book | undefined>(undefined)
  const valueAdd = useMemo(
    () => ({ isModalOpen, setIsModalOpen, editItem, setEditItem }),
    [isModalOpen, editItem],
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
  const [loginStatus, setLoginStatus] = useState<boolean>(
    !!parseCookies().Bearer,
  )
  const valueLogin = useMemo(
    () => ({ loginStatus, setLoginStatus }),
    [loginStatus],
  )
  axios.defaults.baseURL = 'https://develop-api.bookstore.dwarvesf.com/api/v1/'
  axios.defaults.headers.common['Authorization'] = `Bearer ${
    parseCookies().Bearer
  }`
  return (
    <LoginContext.Provider value={valueLogin}>
      <BooksContext.Provider value={valuesBooksContext}>
        <ModalAddAndEditContext.Provider value={valueAdd}>
          <ModalDeleteContext.Provider value={valueDelete}>
            <BooksViewContext.Provider value={valueCurrentView}>
              {children}
            </BooksViewContext.Provider>
          </ModalDeleteContext.Provider>
        </ModalAddAndEditContext.Provider>
      </BooksContext.Provider>
    </LoginContext.Provider>
  )
}
