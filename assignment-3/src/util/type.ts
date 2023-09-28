export type book = {
  id: number
  name: string
  author: string
  topic: string
  pureName: string
}
// context
export type themeContextType = {
  theme: string
  setTheme: (theme: string) => void
}
export type modelDeleteContextType = {
  deleteItem?: book
  setDeleteItem: (item: book | undefined) => void
}
export type modalAddContextType = {
  isModalAddOpen: boolean
  setIsModalAddOpen: (isOpen: boolean) => void
}
export type bookViewContextType = {
  currentView: book[]
  setCurrentView: (view: book[]) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  maxView: number
}
export type booksDataContextType = {
  books: book[]
  setBooks: (books: book[]) => void
  searchedBookList?: book[]
  setSearchedBookList: (books: book[] | undefined) => void
  searchValue: string
  setSearchValue: (value: string) => void
}
// components type
export type PaginationBarType = {
  totalPage: number
  siblingCount: number
  currentPage: number
  setCurrentPage: number
}
