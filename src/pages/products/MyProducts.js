import React, { useState, useEffect, useCallback } from 'react'
import { Title, TableList, Form } from '../../components'
import api from '../../services/api'

const columns = [
  { id: 'cod', label: 'Código', minWidth: 100, align: 'left' },
  { id: 'title', label: 'Título', minWidth: 170, align: 'left' },
  { id: 'price', label: 'Preço (R$)', minWidth: 100, align: 'right', format: value => value.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") },
  { id: 'quantity', label: 'Quantidade', minWidth: 100, align: 'center' },
]

export default function MyProducts({ alert, loading }) {
  const [items, setItems] = useState([])
  const [itemToEdit, setItemToEdit] = useState(null)

  const getProducts = useCallback(() => {
    const config = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
      }
    }

    loading(true)
    api.request("get", api.routes.ROUTE_COMPANY_LIST_PRODUCTS, null, config, (cod, message, data) => {
      loading(false)

      if (cod === 200) {
        setItems(data)
      } else {
        alert(message, "error")
      }
    })
  })

  useEffect(() => getProducts(), [])

  const renderPage1 = () => {
    return <TableList columns={columns} items={items} onClick={(row) => setItemToEdit(row)} />
  }

  const renderPage2 = () => {
    return <Form type="edit-product" alert={alert} loading={loading} itemToEdit={itemToEdit}
      onSubmit={() => {
        getProducts()
        setItemToEdit(null)
      }} onClose={() => setItemToEdit(null)} />
  }

  return (
    <div>
      <Title marginBottom={30}>Meus produtos</Title>

      {!itemToEdit ? renderPage1() : renderPage2()}
    </div>
  )
}