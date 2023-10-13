import React, { useContext } from 'react'
import Link from 'next/link'
import { ModalDeleteContext } from '../../utils/context/modalDeleteContext'
import { BooksViewContext } from '../../utils/context/bookViewContext'
import { book } from '../../utils/types'
import { ModalAddAndEditContext } from '../../utils/context/modalAddContext'

function TableBooks() {
  const modalDeleteContext = useContext(ModalDeleteContext)
  const { setDeleteItem } = modalDeleteContext
  const bookViewContext = useContext(BooksViewContext)
  const { currentView } = bookViewContext
  const { setEditItem, setIsModalOpen } = useContext(ModalAddAndEditContext)
  const propsDataList = Object.keys(currentView[0] || {})

  const handleDelete = (item: book) => {
    setDeleteItem(item)
  }
  return (
    <div id="wrapper-table">
      <table
        id="book-table"
        className="table-fixed border-collapse box-border w-full"
      >
        <colgroup>
          {propsDataList.map((prop, index) => {
            if (prop === 'pureName' || prop === 'id') return null
            if (prop === 'name') return <col key={index} span={2} />
            return <col key={index} />
          })}
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2} className="table-cell">
              Name
            </th>
            <th className="table-cell">Author</th>
            <th className="table-cell">Topic</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentView.length === 0 ? (
            <tr>
              <td colSpan={5} className="table-cell font-bold">
                No Book Available
              </td>
            </tr>
          ) : (
            currentView.map((item, index) => (
              <tr key={index}>
                <td colSpan={2} key={`name ${index}`} className="table-cell">
                  {item.name}
                </td>
                <td key={`author ${index}`} className="table-cell">
                  {item.author}
                </td>
                <td key={`topic ${index}`} className="table-cell">
                  {item.topic?.name}
                </td>
                <td key={`${item} ${index}`} className="table-cell">
                  <button className="interact-button border-r-2 border-rose-700 pr-1">
                    <Link href={`/book/${item.id}`}>Detail</Link>
                  </button>
                  <button
                    className="pl-1 interact-button border-r-2 border-rose-700 pr-1"
                    onClick={() => {
                      setEditItem(item)
                      setIsModalOpen(true)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="interact-button pl-1"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableBooks
