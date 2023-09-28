import { createContext } from 'react'
import { booksDataContextType } from '../type'

export const BooksContext = createContext<booksDataContextType>({
  books: [],
  setBooks: () => {},
  searchedBookList: [],
  setSearchedBookList: () => {},
  searchValue: '',
  setSearchValue: () => {},
})
