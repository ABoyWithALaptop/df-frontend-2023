import React, { useContext } from 'react'
import './style.css'
import { ThemeContext } from '../../util/context/themeContext'

function rangePagi(current, sibling, totalPage) {
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
    // range.push(totalPage)
  }
  return range
}

function PaginationBar({
  totalPage,
  siblingCount = 1,
  currentPage,
  setCurrentPage,
}) {
  // const totalPage = 10
  const DOTS = '...'
  const visiblePage = rangePagi(currentPage, siblingCount, totalPage)
  const { theme } = useContext(ThemeContext)

  return (
    <div className="pagination-wrapper">
      <button
        disabled={currentPage === 1}
        className={`pagination-button ${theme === 'dark' ? 'dark' : ''}`}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      {visiblePage.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            disabled={page === DOTS}
            className={`pagination-button ${
              page === currentPage ? 'activePage' : ''
            } ${theme === 'dark' ? 'dark' : ''}`}
          >
            {page}
          </button>
        )
      })}
      <button
        disabled={currentPage === totalPage}
        className={`pagination-button ${theme === 'dark' ? 'dark' : ''}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationBar
