import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: '@testing-library',
  url: 'www.blog.com/test-library.html',
  likes: 10
}

/**
 * // method 1: search for a matching text from the entire HTML code
 * rendered by the component.
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  * // method 2: uses the getByText method of the object returned by
  * the render method.
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  * // method 3: search for a specific element that is rendered by the
  * component with the querySelector method that receives a CSS selector
  * as its parameter.
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
**/

test('renders title of blog', () => {
  const component = render(
    <Blog blog={blog} />
  )

  //component.debug()
  /*
  const elem = component.container.querySelector('button')
  console.log(prettyDOM(elem))
  */

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('renders author of blog', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    '@testing-library'
  )
})

test('renders url of blog', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'www.blog.com/test-library.html'
  )
})

test('renders likes of blog', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    '10'
  )
})
