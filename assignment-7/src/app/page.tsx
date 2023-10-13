'use client'

import React, { useContext, useEffect } from 'react'

import { useRouter, redirect } from 'next/navigation'
import ControlBar from '../components/SearchingBar'
import TableBooks from '../components/TableBooks'
import AddOrEditBookModal from '../components/modals/AddBookModal'
import { ModalAddAndEditContext } from '../utils/context/modalAddContext'
import DeleteBookModal from '../components/modals/DeleteBookModal'
import { ModalDeleteContext } from '../utils/context/modalDeleteContext'
import { BooksContext } from '../utils/context/booksDataContext'
import PaginationBar from '../components/Pagination/PaginationBar'
import { LoginContext } from '../utils/context/userContext'
import Loading from '../components/loading'
import { useGetBooks } from '../api/generated/book/book'

export default function Home() {
  const { books, setBooks } = React.useContext(BooksContext)
  const { deleteItem } = React.useContext(ModalDeleteContext)
  const { isModalOpen, setIsModalOpen } = React.useContext(
    ModalAddAndEditContext,
  )
  const { loginStatus } = useContext(LoginContext)
  const { data: booksData, isLoading, isValidating } = useGetBooks()

  if (!loginStatus) {
    redirect('/login')
  }
  useEffect(() => {
    setBooks(booksData?.data?.data || [])
  }, [booksData])
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main className="main">
            <section>
              <ControlBar setIsModalOpen={setIsModalOpen} />
              <TableBooks />
              <PaginationBar data={books} />
            </section>
          </main>
          {isModalOpen && (
            <AddOrEditBookModal setIsModalOpen={setIsModalOpen} />
          )}
          {deleteItem && <DeleteBookModal />}
        </>
      )}
    </>
  )
}
