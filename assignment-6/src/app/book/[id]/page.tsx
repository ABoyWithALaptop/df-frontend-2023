'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { ModalDeleteContext } from '../../../utils/context/modalDeleteContext'
import { BooksContext } from '../../../utils/context/booksDataContext'
import DeleteBookModal from '../../../components/modals/DeleteBookModal'
import { useGetBook } from '../../../api/generated/book/book'
import { redirect } from 'next/navigation'

export default function DetailPage({ params }: { params: { id: string } }) {
  const { deleteItem, setDeleteItem } = useContext(ModalDeleteContext)
  const { id } = params
  const { data: dataCurrentBook, error } = useGetBook(Number(id))
  const currentBookDetail = dataCurrentBook?.data?.data
  if (error) {
    redirect('/')
  }
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
            {currentBookDetail?.topic?.name}
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
