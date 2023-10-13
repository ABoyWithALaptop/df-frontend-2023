import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BooksContext } from '../../utils/context/booksDataContext'
import { removeAccents } from '../../utils/functions'

function ControlBar({
  setIsModalOpen,
}: {
  setIsModalOpen: (status: boolean) => void
}) {
  const booksContext = React.useContext(BooksContext)
  const { books, setSearchedBookList, searchValue, setSearchValue } =
    booksContext
  const { theme } = useTheme()
  const timeOutId = React.useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (timeOutId) clearTimeout(timeOutId.current)
    if (searchValue === '') {
      setSearchedBookList([])
    } else {
      const timeOut = setTimeout(() => {
        const dataShow = books.filter((item) =>
          removeAccents(item.name.toLowerCase()).includes(
            removeAccents(searchValue.toLowerCase()),
          ),
        )
        setSearchedBookList(dataShow.length > 0 ? dataShow : undefined)
      }, 500)
      timeOutId.current = timeOut
    }
  }, [books, searchValue, setSearchedBookList])

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      timeOutId.current = undefined
      const dataShow = books.filter((item) =>
        removeAccents(item.name.toLowerCase()).includes(
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
        className="standard-height-element border-2 border-primary-color-dark rounded-md px-2 py-1 text-sm mr-3 dark:bg-primary-color-dark dark:border-tertiary-color-dark "
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          handleKeydown(e)
        }}
        value={searchValue}
      />
      <button
        id="add"
        type="button"
        className={`primary standard-height-element text-xs ${
          theme === 'dark' ? 'dark' : ''
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        Add book
      </button>
    </div>
  )
}

export default ControlBar
