// const fetcher = async ({ url, config }: {
//   url: string;
//   config?: RequestInit;
// }):Promise<JSON> => {
//   const response = await fetch(url);
//   return response.json();

import axios from 'axios'
import { createBook } from './generated/book/book'

// }
export type FetcherError = Error & { response: Response }

// export async function fetcher<TResponse>({
//   url,
//   config,
// }: {
//   url: string
//   config?: RequestInit
// }): Promise<TResponse> {
//   const res = await fetch(`${process.env.API_URL}${url}`, config)
//   if (res.ok) {
//     return res.json() as Promise<TResponse>
//   }
//   const error = new Error(res.statusText) as FetcherError
//   error.response = res
//   return Promise.reject(error)
// }
// const signUp = fetcher<SignUpResponse>({
//   url: '/api/signup',
//   config: { method: 'POST' },
// })

axios.defaults.baseURL = process.env.API_URL

// CreateBookRequest

// createBook({ name: 'test', author: 'test', topicId: 1 })
