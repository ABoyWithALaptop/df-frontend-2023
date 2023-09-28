import { createContext } from 'react'
import { bookViewContextType } from '../type'

export const BooksViewContext = createContext<bookViewContextType>({
  currentView: [],
  setCurrentView: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  maxView: 5,
})
