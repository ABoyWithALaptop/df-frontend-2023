import { createContext } from "react";

export const BooksViewContext = createContext({
  currentView: [],
  setCurrentView: () => { },
  maxView: 5
})