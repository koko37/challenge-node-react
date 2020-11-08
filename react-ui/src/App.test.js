import { render, screen, queryByAttribute } from '@testing-library/react'
import App from './App'

const getById = queryByAttribute.bind(null, 'id')

test('renders Contacts title', () => {
  const dom = render(<App />)
  
  const titleElement = screen.getByText(/Contacts/i)
  expect(titleElement).toBeInTheDocument()

  const addButtonElement = getById(dom.container, 'btn-add')
  expect(addButtonElement).toBeInTheDocument()

  const tableElement = getById(dom.container, 'tbl-contacts')
  expect(tableElement).toBeInTheDocument()
})
