import React, { useState, useEffect } from 'react'
import { Container, Row, Table, InputGroup, Pagination, Button, Modal, Form } from 'react-bootstrap'
import BounceLoader from 'react-spinners/BounceLoader'

import 'bootstrap/dist/css/bootstrap.min.css'
import searchIcon from './assets/imgs/search.png'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [activePage, setActivePage] = useState(1)

  const [addNew, setAddNew] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  const baseUri = "http://localhost:5000/contacts"
  useEffect(() => {
    setLoading(true)

    fetch(`${baseUri}?page=${activePage}&search=${searchKey}`)
      .then(response => response.json())
      .then(response => {
        setLoading(false)
        setPageCount(response.last_page)
        setContacts(response.data)
      })
  }, [activePage, searchKey])

  const pagination = (pageSize, active) => {
    let items = [];
    for (let number = 1; number <= pageSize; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => setActivePage(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return items
  }

  const onClickSubmit = () => {
    setLoading(true)
    fetch(baseUri, {
      method: 'post',
      body: JSON.stringify({
        name: contactName,
        phone: contactPhone
      })
    })
      .then(response => response.json())
      .then(response => {
        setLoading(false)
        setAddNew(false)
        setActivePage(1)
      })
  }

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-between align-items-center my-2">
            <div className="d-flex justify-content-start align-items-center">
              <h1 className="display-5 text-center mr-4">Contacts</h1>
              <BounceLoader size={24} loading={loading} />
            </div>
            <div className="d-flex align-items-center col-sm-4">
              <Button variant="primary" className="mr-2" onClick={() => setAddNew(true)}>Add</Button>
              <InputGroup className="rounded-circle">
                <InputGroup.Prepend>
                  <InputGroup.Text id="searchIcon"><img src={searchIcon} alt="search" width="24" height="24" /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  className="text-center"
                  placeholder="Search"
                  value={searchKey}
                  onChange = { (e) => {
                    setSearchKey(e.target.value)
                    setActivePage(1)
                  }}
                  />
              </InputGroup>
            </div>
        </Row>
        <Row>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              { contacts.map((contact, id) => (
                  <tr key={id}>
                    <td>{ contact.name }</td>
                    <td>{ contact.phone }</td>
                  </tr>
                  )
                )
              }
            </tbody>
          </Table>
        </Row>
        <Row className="d-flex justify-content-center mt-4">
          <Pagination>
            { pagination(pageCount, activePage) }
          </Pagination>
        </Row>
      </Container>

      <Modal show={addNew} onHide={() => setAddNew(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" value={contactName} onChange={(e) => setContactName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddNew(false)}>Cancel</Button>
          <Button variant="primary" onClick={onClickSubmit} disabled={contactName === '' || contactPhone === ''}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
