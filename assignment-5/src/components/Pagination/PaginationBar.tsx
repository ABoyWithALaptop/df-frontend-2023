import React, { useContext, useEffect } from 'react'
import './style.css'
import { BooksViewContext } from '../../utils/context/bookViewContext'
import { BooksContext } from '../../utils/context/booksDataContext'
import { book } from '../../utils/types'

function rangePagi(current: number, sibling: number, totalPage: number) {
  const range: Array<number | string> = [1]
  const lastPageInCurrentInteractRange = current + sibling

  if (sibling * 2 + 3 > totalPage) {
    const temp = Array.from({ length: totalPage }).map((_, index) => index + 1)
    return temp
  }

  // when current windows ([sibs,cur,sibs]) at the start of the range next to 1
  if (current <= 1 + sibling + 1) {
    // shape of range will like 1 2 3 4... last even current = 1
    const temp = Array.from({ length: sibling * 2 + 2 }).map(
      (_, index) => 1 + index + 1,
    )
    range.push(...temp)
    range.push('...')
    range.push(totalPage)
    return range
  }
  if (lastPageInCurrentInteractRange >= totalPage - 1) {
    const temp = Array.from({ length: sibling * 2 + 2 })
      .map((_, index) => totalPage - index - 1)
      .reverse()
    range.push('...')
    range.push(...temp)
    range.push(totalPage)
    return range
  }
  // shape of range will like 1 ... n-sib n n+sib ... last
  range.push('...')
  const temp = Array.from({ length: sibling + 1 }).map(
    (_, index) => current - sibling + index,
  )
  // at this step range will be 1 ... n-sib n
  range.push(...temp)
  // when current windows ([sibs,cur,sibs]) at the end of the range next to totalPage
  if (lastPageInCurrentInteractRange < totalPage - 1) {
    const temp = Array.from({ length: sibling }).map(
      (_, index) => current + index + 1,
    )
    // at this push range will be 1 ... n-sib n (newPart -> n+sib ... last)
    range.push(...temp)
    range.push('...')
    range.push(totalPage)
  } else {
    const pageLeft = totalPage - current
    const temp = Array.from({ length: pageLeft })
      .map((_, index) => totalPage - index)
      .reverse()
    range.push(...temp)
  }
  return range
}

function PaginationBar({
  data,
  neighbor = 1,
}: {
  data: book[]
  neighbor?: number
}) {
  const siblingCount = neighbor
  const bookViewContext = useContext(BooksViewContext)
  const booksContext = useContext(BooksContext)
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
  const DOTS = '...'
  const visiblePage = rangePagi(currentPage, siblingCount, totalPage)

  return (
    <div className="pagination-wrapper float-right my-3">
      <button
        disabled={currentPage === 1}
        className="pagination-button  disabled:opacity-50 dark:disabled:text-gray-400"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      {visiblePage.map((page, index) => {
        return (
          <button
            key={index}
            disabled={page === DOTS}
            onClick={() => setCurrentPage(page as number)}
            className={`pagination-button ${
              page === currentPage ? 'activePage' : ''
            }  disabled:opacity-50 dark:disabled:text-gray-400`}
          >
            {page}
          </button>
        )
      })}
      <button
        disabled={currentPage === totalPage}
        className="pagination-button disabled:opacity-50 dark:disabled:text-gray-400"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationBar
