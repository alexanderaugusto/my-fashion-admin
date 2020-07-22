import React, { useState, useEffect, useCallback } from 'react'
import { Title, TableList } from '../../components'
import api from '../../services/api'

const columns = [
  { id: 'sale_product', label: 'Produto', minWidth: 170, align: 'left' },
  { id: 'sale_user', label: 'Cliente', align: 'left' },
  { id: 'sale_date', label: 'Data', align: 'center' },
  { id: 'sale_quantity', label: 'Quantidade', align: 'center' },
  { id: 'sale_discount', label: 'Descontos (R$)', align: 'right', format: value => value.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") },
  { id: 'sale_total', label: 'Total da venda (R$)', align: 'right', format: value => value.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") }
]

export default function MySales({ alert, loading }) {
  const [items, setItems] = useState([])

  const getSales = useCallback(() => {
    const config = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
      }
    }

    loading(true)
    api.request("get", api.routes.ROUTE_COMPANY_LIST_SALES, null, config, (cod, message, data) => {
      loading(false)

      if (cod === 200) {
        const newData = []
        data.filter(prop => {
          const { cod, title, price, buy_quantity: sale_quantity, discount: sale_discount, buy_date: sale_date } = prop.product
          const { name: sale_user } = prop.user
          const sale_product = cod + " - " + title
          const sale_total = (price * sale_quantity) - sale_discount
          
          prop = { ...prop, sale_product, sale_user, sale_quantity, sale_total, sale_discount, sale_date }

          newData.push(prop)
        })
        setItems(newData)
      } else {
        alert(message, "error")
      }
    })
  })

  useEffect(() => getSales(), [])

  return (
    <div>
      <Title marginBottom={30}>Minhas vendas</Title>

      <TableList columns={columns} items={items} renderTotal={true} />
    </div>
  )
}