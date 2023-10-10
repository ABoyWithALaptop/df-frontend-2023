'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { ModalDeleteContext } from '../../../utils/context/modalDeleteContext'
import { BooksContext } from '../../../utils/context/booksDataContext'
import DeleteBookModal from '../../../components/modals/DeleteBookModal'

export default function DetailPage({ params }: { params: { id: string } }) {
  const { deleteItem, setDeleteItem } = useContext(ModalDeleteContext)
  const { id } = params
  const { books } = useContext(BooksContext)
  const currentBookDetail = books.find((item) => item.id === Number(id))
  return (
    <main className="main">
      <div className="">
        <button className="interact-button">
          <Link href="/">Back</Link>
        </button>
        <div>
          <h1 className="text-3xl">DetailPage</h1>
          <h2 className="text-2xl py-5">{currentBookDetail?.name}</h2>
          <h3 className="text-xl">
            <span className="font-bold">Author: </span>
            {currentBookDetail?.author}
          </h3>
          <h4 className="text-lg pb-4">
            <span className="font-bold">Topic: </span>
            {currentBookDetail?.topic}
          </h4>
        </div>
        <button
          className="interact-button"
          onClick={() => setDeleteItem(currentBookDetail)}
        >
          Delete
        </button>
      </div>
      {deleteItem && <DeleteBookModal />}
    </main>
  )
}
