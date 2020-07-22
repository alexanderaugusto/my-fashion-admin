import React from 'react'
import { Form, Title } from '../../components'

export default function NewProducts(props) {
  return (
    <div>
      <Title>Novo produto</Title>

      <Form {...props} type="insert-product" />
    </div>
  )
}