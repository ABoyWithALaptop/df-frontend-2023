'use client'

import React from 'react'
import ControlBar from '../components/SearchingBar'
import TableBooks from '../components/TableBooks'
import AddBookModal from '../components/modals/AddBookModal'
import { ModalAddContext } from '../utils/context/modalAddContext'
import DeleteBookModal from '../components/modals/DeleteBookModal'
import { ModalDeleteContext } from '../utils/context/modalDeleteContext'
import { BooksContext } from '../utils/context/booksDataContext'
import PaginationBar from '../components/Pagination/PaginationBar'

export default function Home() {
  const { books } = React.useContext(BooksContext)
  const { deleteItem } = React.useContext(ModalDeleteContext)
  const { isModalAddOpen, setIsModalAddOpen } =
    React.useContext(ModalAddContext)
  return (
    <>
      <main className="main">
        <section>
          <ControlBar setIsModalAddOpen={setIsModalAddOpen} />
          <TableBooks />
          <PaginationBar data={books} />
        </section>
      </main>

      {isModalAddOpen && <AddBookModal setIsModalAddOpen={setIsModalAddOpen} />}
      {deleteItem && <DeleteBookModal />}
    </>
  )
}
