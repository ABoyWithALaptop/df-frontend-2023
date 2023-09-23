import React, { useEffect } from 'react'
import { ModalAddContext } from '../../util/context/modalAddContext'
// import { BooksViewContext } from '../../util/context/bookViewContext';
import { BooksContext } from '../../util/context/booksDataContext';
import { ThemeContext } from '../../util/context/ThemeContext';
import { removeAccents } from '../../util/functions';



function ControlBar() {
  // const [searchValue, setSearchValue] = React.useState('')
  const [timeOutId, setTimeOutId] = React.useState(null)
  const modalContext = React.useContext(ModalAddContext)
  const { setIsModalAddOpen } = modalContext
  const booksContext = React.useContext(BooksContext)
  const { books, setSearchedBookList, searchValue, setSearchValue } = booksContext
  const {theme} = React.useContext(ThemeContext)

  useEffect(() => {
    if(timeOutId) clearTimeout(timeOutId)
    if (searchValue === '') {
      setSearchedBookList([])
    }
    else {
      const timeOut = setTimeout(() => {
        const dataShow = books.filter(item => removeAccents(item.pureName).includes(removeAccents(searchValue.toLowerCase())))
        setSearchedBookList(dataShow.length > 0 ? dataShow : null)
      }, 500)
      setTimeOutId(timeOut)
      // const dataShow = books.filter(item => removeAccents(item.name).includes(removeAccents(searchValue)))
      // setSearchedBookList(dataShow)
    }
  }, [searchValue])
  const handleKeydown = (e) => { 
    if (e.keyCode === 13) { 
      setTimeOutId(null)
      const dataShow = books.filter(item => removeAccents(item.pureName).includes(removeAccents(searchValue.toLowerCase())))
        // console.log('dataShow', dataShow);
      setSearchedBookList(dataShow.length > 0 ? dataShow : null)
    }
  }
  return (
    <div id="handleData">
      <input
        type="text"
        placeholder="Search book"
        title="search"
        id="searchBar"
        className={`stdHeight ${theme === 'dark'?"dark" :"" }`}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => { handleKeydown(e)}}
        value={searchValue}
      />
      <button id="add" type="button" className={`primary stdHeight ${theme === 'dark'?"dark" :"" }`} onClick={() => setIsModalAddOpen(true)}>
        Add book
      </button>
    </div>
  )
}

export default ControlBar