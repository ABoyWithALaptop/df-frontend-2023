'use client'

import React, { useContext, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import ControlBar from '../components/SearchingBar'
import TableBooks from '../components/TableBooks'
import AddOrEditBookModal from '../components/modals/AddBookModal'
import { ModalAddAndEditContext } from '../utils/context/modalAddContext'
import DeleteBookModal from '../components/modals/DeleteBookModal'
import { ModalDeleteContext } from '../utils/context/modalDeleteContext'
import { BooksContext } from '../utils/context/booksDataContext'
import PaginationBar from '../components/Pagination/PaginationBar'
import { LoginContext } from '../utils/context/userContext'

export default function Home() {
  const { books } = React.useContext(BooksContext)
  const { deleteItem } = React.useContext(ModalDeleteContext)
  const { isModalOpen, setIsModalOpen } = React.useContext(
    ModalAddAndEditContext,
  )
  const { login } = useContext(LoginContext)
  const router = useRouter()
  useEffect(() => {
    if (!login) router.push('/login')
  }, [])
  return (
    <>
      <main className="main">
        <section>
          <ControlBar setIsModalOpen={setIsModalOpen} />
          <TableBooks />
          <PaginationBar data={books} />
        </section>
      </main>
      {isModalOpen && <AddOrEditBookModal setIsModalOpen={setIsModalOpen} />}
      {deleteItem && <DeleteBookModal />}
    </>
  )
}
