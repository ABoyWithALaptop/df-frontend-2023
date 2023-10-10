import React, { useEffect } from 'react'
import PaginationBar from './PaginationBar'
import { BooksViewContext } from '../../util/context/bookViewContext'
import { BooksContext } from '../../util/context/booksDataContext'

function PaginationWrapper({ children, data }) {
  const bookViewContext = React.useContext(BooksViewContext)
  const booksContext = React.useContext(BooksContext)
  const { setCurrentView, currentPage, setCurrentPage, maxView } =
    bookViewContext
  const { searchedBookList } = booksContext
  useEffect(() => {
    if (searchedBookList === undefined) {
      setCurrentView([])
    } else if (searchedBookList.length > 0) {
      setCurrentPage(1)
      const dataShow = searchedBookList.slice(
        (currentPage - 1) * maxView,
        currentPage * maxView,
      )

      setCurrentView(dataShow)
    } else {
      const dataShow = data.slice(
        (currentPage - 1) * maxView,
        currentPage * maxView,
      )
      setCurrentView(dataShow)
    }
  }, [
    currentPage,
    data,
    searchedBookList,
    maxView,
    setCurrentView,
    setCurrentPage,
  ])
  let totalPage = 0
  if (searchedBookList === undefined) totalPage = 1
  else
    totalPage =
      searchedBookList.length > 0
        ? Math.ceil(searchedBookList.length / maxView)
        : Math.ceil(data.length / maxView)
  // searchedBookList === null
  //   ? 1
  //   : searchedBookList.length
  //   ? Math.ceil(searchedBookList.length / maxView)
  //   : Math.ceil(data.length / maxView)
  return (
    <>
      {children}
      <PaginationBar
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        siblingCount={1}
      />
    </>
  )
}

export default PaginationWrapper
