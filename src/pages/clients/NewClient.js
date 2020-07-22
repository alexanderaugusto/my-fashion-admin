import React from 'react'
import { Title, Form } from '../../components'

export default function NewClient(props) {

  return (
    <div>
      <Title>Novo cliente</Title>

      <Form type="insert-client" {...props} />
    </div>
  )
}