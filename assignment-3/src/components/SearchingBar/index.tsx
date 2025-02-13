import React, { useEffect } from 'react'
import { ModalAddContext } from '../../util/context/modalAddContext'
import { BooksContext } from '../../util/context/booksDataContext'
import { ThemeContext } from '../../util/context/themeContext'
import { removeAccents } from '../../util/functions'

function ControlBar() {
  const modalContext = React.useContext(ModalAddContext)
  const { setIsModalAddOpen } = modalContext
  const booksContext = React.useContext(BooksContext)
  const { books, setSearchedBookList, searchValue, setSearchValue } =
    booksContext
  const { theme } = React.useContext(ThemeContext)
  const timeOutId = React.useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (timeOutId) clearTimeout(timeOutId.current)
    if (searchValue === '') {
      setSearchedBookList([])
    } else {
      const timeOut = setTimeout(() => {
        const dataShow = books.filter((item) =>
          removeAccents(item.pureName).includes(
            removeAccents(searchValue.toLowerCase()),
          ),
        )
        setSearchedBookList(dataShow.length > 0 ? dataShow : undefined)
      }, 500)
      timeOutId.current = timeOut
    }
  }, [books, searchValue, setSearchedBookList])

  const handleKeydown = (e) => {
    if (e.keyCode === 13) {
      timeOutId.current = undefined
      const dataShow = books.filter((item) =>
        removeAccents(item.pureName).includes(
          removeAccents(searchValue.toLowerCase()),
        ),
      )
      setSearchedBookList(dataShow.length > 0 ? dataShow : undefined)
    }
  }
  return (
    <div id="handle-data-bar">
      <input
        type="text"
        placeholder="Search book"
        title="search"
        id="searchBar"
        className={`standard-height-element ${theme === 'dark' ? 'dark' : ''}`}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          handleKeydown(e)
        }}
        value={searchValue}
      />
      <button
        id="add"
        type="button"
        className={`primary standard-height-element ${
          theme === 'dark' ? 'dark' : ''
        }`}
        onClick={() => setIsModalAddOpen(true)}
      >
        Add book
      </button>
    </div>
  )
}

export default ControlBar
