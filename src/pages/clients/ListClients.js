import React, { useEffect, useState } from 'react'
import { Title, TableList } from '../../components'
import api from '../../services/api'

const columns = [
  { id: 'email', label: 'Email', minWidth: 170, align: 'left' },
  { id: 'name', label: 'Nome', minWidth: 170, align: 'left' },
  { id: 'cpf', label: 'CPF', minWidth: 100, align: 'left' },
  { id: 'phone', label: 'Celular', minWidth: 100, align: 'left' },
]

export default function ListClients({ alert, loading }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    function getUsers() {
      const config = {
        headers: {
          "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
        }
      }

      loading(true)
      api.request("get", api.routes.ROUTE_COMPANY_LIST_USERS, null, config, (cod, message, data) => {
        loading(false)

        if (cod === 200) {
          setItems(data)
        } else {
          alert(message, "error")
        }
      })
    }

    getUsers()
  }, [])

  return (
    <div>
      <Title marginBottom={30}>Meus clientes</Title>

      <TableList columns={columns} items={items} />
    </div>
  )
}