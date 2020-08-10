import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
//import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')
  //console.log(prettyDOM(input))

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)
  //console.log(createBlog.mock.calls[0][0])

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  )
})
