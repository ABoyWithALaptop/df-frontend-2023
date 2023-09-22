import React, { useEffect } from 'react'
import PaginationBar from './PaginationBar'
import { BooksViewContext } from '../../util/context/bookViewContext';
import { BooksContext } from '../../util/context/booksDataContext';

function PaginationWrapper({ children, data }) {
  // const [currentPage, setCurrentPage] = React.useContext(1)
  const bookViewContext = React.useContext(BooksViewContext)
  const booksContext = React.useContext(BooksContext)
  const { setCurrentView, currentPage, setCurrentPage, maxView } = bookViewContext
  const { searchedBookList }= booksContext
  // const maxView = 3
  let searchList = []

  useEffect(() => {
    if (searchedBookList === null) {
      setCurrentView([])
    }
    else if (searchedBookList.length > 0) {
      setCurrentPage(1)
      searchList = searchedBookList
      const dataShow = searchList.slice((currentPage - 1) * maxView, currentPage * maxView)

      setCurrentView(dataShow)
    } else {
      const dataShow = data.slice((currentPage - 1) * maxView, currentPage * maxView)
      setCurrentView(dataShow)
    }
    
  }, [currentPage, data, searchedBookList])
  const totalPage = searchedBookList === null ?
    1
    : searchedBookList.length ?
      Math.ceil(searchedBookList.length / maxView)
      : Math.ceil(data.length / maxView)
  return (
    <>
      {children}
      <PaginationBar
        totalPage={totalPage}
        data={searchList.length > 0?searchedBookList:data}
        dataPerPage={3}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        siblingCount={1}
      />
    </>
  )
}

export default PaginationWrapper