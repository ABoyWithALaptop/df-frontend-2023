import { createContext } from "react";

export const BooksContext = createContext({
  books: [],
  setBooks: () => { },
  searchedBookList: [],
  setSearchedBookList: () => { },
})