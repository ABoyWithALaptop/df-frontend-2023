import React, { useContext, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { BooksContext } from '../../utils/context/booksDataContext'
import { BooksViewContext } from '../../utils/context/bookViewContext'
import { removeAccents } from '../../utils/functions'
import closeModal from '../../utils/hooks/closeModalHook'
import { book } from '../../utils/types'
import { ModalAddAndEditContext } from '../../utils/context/modalAddContext'

const schema = z.object({
  name: z.string().min(1, 'name is required'),
  author: z.string().min(1, 'author is required'),
  topic: z.string().min(1, 'topic is required'),
})
type schemaType = z.infer<typeof schema>

function AddOrEditBookModal({
  setIsModalOpen,
}: {
  setIsModalOpen: (status: boolean) => void
}) {
  const { editItem, setEditItem } = useContext(ModalAddAndEditContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: editItem || { name: '', author: '', topic: '' },
  })
  const { books, setBooks, setSearchedBookList, searchValue } =
    useContext(BooksContext)
  const { currentView, maxView } = useContext(BooksViewContext)
  const { theme } = useTheme()
  const closeModalData = {
    type: '',
    setStatus: setIsModalOpen as (status: boolean | undefined) => void,
  }
  const handleCloseEsc = closeModal({
    ...closeModalData,
    type: 'esc',
  })

  useEffect(() => {
    document.addEventListener('keydown', handleCloseEsc)
    return () => document.removeEventListener('keydown', handleCloseEsc)
  }, [handleCloseEsc])

  const handleClose = closeModal({
    ...closeModalData,
    type: 'click',
  })
  const processSubmit: SubmitHandler<schemaType> = (data) => {
    let newList: book[]
    const { name, author, topic } = data
    if (editItem) {
      newList = books.map((item) => {
        if (item.id === editItem.id) {
          return {
            id: editItem.id,
            name,
            author,
            topic,
            pureName: name.toLowerCase(),
          }
        }
        return item
      })
    } else {
      const id = books.length + 1
      newList = [
        ...books,
        {
          id,
          name: data.name,
          author: data.author,
          topic: data.topic,
          pureName: data.name.toLowerCase(),
        },
      ]
    }
    setBooks(newList)
    localStorage.setItem('currentData', JSON.stringify(newList))
    setIsModalOpen(false)
    if (currentView.length < maxView) {
      const item = {
        id: editItem?.id || books.length + 1,
        name,
        author,
        topic,
        pureName: name.toLowerCase(),
      }
      if (
        removeAccents(item.pureName).includes(
          removeAccents(searchValue.toLowerCase()),
        )
      )
        setSearchedBookList([
          ...currentView,
          {
            id: editItem?.id || books.length + 1,
            name,
            author,
            topic,
            pureName: name.toLowerCase(),
          },
        ])
    }
    setEditItem(undefined)
  }

  return (
    <div
      className="overlay"
      id="add-book-modal-overlay"
      onClick={(ev) => {
        if (ev.currentTarget === ev.target) handleClose(ev)
      }}
      role="presentation"
    >
      <aside
        className={`modal ${theme === 'dark' && 'dark'}`}
        id="addBookModal"
      >
        <button
          type="button"
          className={`close-button closeable-element ${
            theme === 'dark' && 'dark'
          }`}
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold">
          {`${editItem ? 'Add' : 'Edit'}`} book
        </h2>
        <form name="addBookModalForm" onSubmit={handleSubmit(processSubmit)}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              className={`standard-height-element w-full py-3 px-5 my-2 block border-2 border-tertiary-color rounded box-border dark:bg-primary-color-dark dark:border-tertiary-color ${
                errors.name && 'error'
              }`}
              {...register('name')}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => {
                return <small className="error-message">{message}</small>
              }}
            />
          </label>

          <label htmlFor="author">
            Author
            <input
              type="text"
              id="author"
              className={`standard-height-element w-full py-3 px-5 my-2 block border-2 border-tertiary-color rounded box-border dark:bg-primary-color-dark dark:border-tertiary-color ${
                errors.author && 'error'
              }`}
              {...register('author')}
            />
            <ErrorMessage
              errors={errors}
              name="author"
              render={({ message }) => {
                return <small className="error-message">{message}</small>
              }}
            />
          </label>

          <label htmlFor="topic">
            Topic
            <select
              id="topic"
              title="topic"
              className="standard-height-element w-full py-3 px-5 my-2 block border-2 border-tertiary-color rounded box-border dark:bg-primary-color-dark dark:border-tertiary-color"
              {...register('topic')}
            >
              <option value="Programing" className="topicOption">
                Programing
              </option>
              <option value="Database" className="topicOption">
                Database
              </option>
              <option value="Devops" className="topicOption">
                Devops
              </option>
            </select>
            <ErrorMessage
              errors={errors}
              name="topic"
              render={({ message }) => {
                return <small className="error-message">{message}</small>
              }}
            />
          </label>

          <button
            type="submit"
            className={`primary standard-height-element ${
              theme === 'dark' && 'dark'
            }`}
          >
            {editItem ? 'Edit' : 'Create'}
          </button>
        </form>
      </aside>
    </div>
  )
}

export default AddOrEditBookModal
