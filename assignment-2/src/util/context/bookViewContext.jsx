import { createContext } from "react";

export const BooksViewContext = createContext({
  currentView: [],
  setCurrentView: () => { },
  currentPage: 1,
  setCurrentPage:() => { },
  maxView: 5
})