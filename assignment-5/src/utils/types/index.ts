export type book = {
  id: number
  name: string
  author: string
  topic: string
  pureName: string
}
export type loginStatusType = {
  login: boolean
  setLogin: (login: boolean) => void
  emailName: string
  setEmailName: (emailName: string) => void
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
export type modalAddAndEditContextType = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  editItem?: book
  setEditItem: (item: book | undefined) => void
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
export type SwitchButtonType = {
  isOn: boolean
  handleToggle: () => void
  label: string
}
