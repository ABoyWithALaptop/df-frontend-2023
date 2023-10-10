import { createContext } from 'react'
import { bookViewContextType } from '../types'

export const BooksViewContext = createContext<bookViewContextType>({
  currentView: [],
  setCurrentView: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  maxView: 5,
})
