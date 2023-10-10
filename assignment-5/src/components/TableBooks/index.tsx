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
  const dataValue = currentView.map((item) => {
    const render = propsDataList.map((value, index) => {
      if (value === 'id') return null
      if (value === 'name')
        return (
          <td colSpan={2} key={`${item} ${index}`} className="table-cell">
            {item[value]}
          </td>
        )
      if (value === 'topic')
        return (
          <td key={`${item} ${index}`} className="table-cell">
            {item[value]}
          </td>
        )

      if (value === 'pureName')
        return (
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
        )
      return (
        <td key={`${item} ${index}`} className="table-cell">
          {item[value as keyof book]}
        </td>
      )
    })
    return render
  })

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
          {dataValue.map((item, index) => (
            <tr key={index}>{item}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableBooks
