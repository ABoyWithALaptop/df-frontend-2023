import { createContext } from 'react'
import { booksDataContextType } from '../types'

export const BooksContext = createContext<booksDataContextType>({
  books: [],
  setBooks: () => {},
  searchedBookList: [],
  setSearchedBookList: () => {},
  searchValue: '',
  setSearchValue: () => {},
})
