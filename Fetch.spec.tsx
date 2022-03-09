// __tests__/fetch.test.js
import React from 'react'
import {DefaultRequestBody, rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from './Fetch'

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('<Fetch/> loads and displays greeting with get', async () => {
  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByTestId('button-get-data'))

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByTestId('button-get-data')).toBeDisabled()
})

test('<Fetch/> loads and displays greeting with POST', async () => {
  let postBody: DefaultRequestBody = ''
  server.use(
    rest.post("/greeting", (req, res, ctx) => {
      console.log("post body", req.body)
      postBody = req.body
      return res(ctx.json({greeting: 'hello post'}))
    }))
  
  render(<Fetch url="/greeting" />)

  await fireEvent.click(screen.getByTestId('button-post-data'))
  console.log('EVENT: clicked post button!')
  expect(postBody).toBe("postTest")

  // await waitFor(() => screen.getByRole('heading'))
  await screen.findByRole('heading')

  expect(screen.getByRole('heading')).toHaveTextContent('hello post')
  expect(screen.getByTestId('button-post-data')).toBeDisabled()
})

test('<Fetch/> handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByTestId('button-get-data'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByTestId('button-get-data')).not.toBeDisabled()
})