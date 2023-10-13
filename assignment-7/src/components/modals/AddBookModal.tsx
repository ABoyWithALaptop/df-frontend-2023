import React, { useContext, useEffect } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { BooksViewContext } from '../../utils/context/bookViewContext'
import { closeModalClick, closeModalEsc } from '../../utils/functions'
import { ModalAddAndEditContext } from '../../utils/context/modalAddContext'
import { useGetTopics } from '../../api/generated/topic/topic'
import {
  createBook,
  getGetBooksKey,
  updateBook,
} from '../../api/generated/book/book'
import { mutate } from 'swr'

const schema = z.object({
  name: z.string().min(1, 'name is required'),
  author: z
    .string()
    .min(1, 'author is required')
    .refine(
      (val) => /[a-zA-Z]/.test(val),
      'Author name only contain character and space',
    ),
  topic: z.string(),
})
type schemaType = z.infer<typeof schema>

function AddOrEditBookModal({
  setIsModalOpen,
}: {
  setIsModalOpen: (status: boolean) => void
}) {
  const { data: topicData } = useGetTopics()
  const { editItem, setEditItem } = useContext(ModalAddAndEditContext)
  const { currentPage, setCurrentPage } = useContext(BooksViewContext)

  useEffect(() => {
    document.addEventListener('keydown', (ev) =>
      closeModalEsc(
        ev,
        setIsModalOpen as (status: boolean | undefined) => void,
      ),
    )
    return () =>
      document.removeEventListener('keydown', (ev) =>
        closeModalEsc(
          ev,
          setIsModalOpen as (status: boolean | undefined) => void,
        ),
      )
  }, [setIsModalOpen])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: editItem
      ? {
          name: editItem.name,
          author: editItem.author,
          topic: editItem.topic?.id?.toString(),
        }
      : { name: '', author: '', topic: '1' },
  })
  const processSubmit: SubmitHandler<schemaType> = (data) => {
    if (editItem) {
      updateBook(editItem.id, {
        name: data.name,
        author: data.author,
        topicId: parseInt(data.topic),
      }).then(() => {
        const key = getGetBooksKey()
        mutate(key)
        setIsModalOpen(false)
        setEditItem(undefined)
      })
    } else {
      createBook({
        name: data.name,
        author: data.author,
        topicId: parseInt(data.topic),
      }).then(() => {
        const key = getGetBooksKey()
        if (currentPage === 0) setCurrentPage(1)
        mutate(key)
        setIsModalOpen(false)
      })
    }
  }

  return (
    <div
      className="overlay"
      id="add-book-modal-overlay"
      onClick={(ev) => {
        closeModalClick(
          ev,
          setIsModalOpen as (status: boolean | undefined) => void,
        )
      }}
      role="presentation"
    >
      <aside className={`modal `} id="addBookModal">
        <button
          type="button"
          className={`close-button closeable-element `}
          onClick={(ev) => {
            closeModalClick(
              ev,
              setIsModalOpen as (status: boolean | undefined) => void,
            )
          }}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold">{editItem ? 'Edit' : 'Add'} book</h2>
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
              {topicData?.data.data?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
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
            className={`primary standard-height-element`}
            onClick={(ev) => ev.stopPropagation()}
          >
            {editItem ? 'Edit' : 'create'}
          </button>
        </form>
      </aside>
    </div>
  )
}

export default AddOrEditBookModal
