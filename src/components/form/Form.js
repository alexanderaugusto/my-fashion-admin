import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import InsertProductForm from './InsertProduct'
import InsertClientForm from './InsertClient'
import EditProductForm from './EditProduct'
import LoginForm from './Login'
import RegisterForm from './Register'

const useStyles = makeStyles(theme => ({
  form: {
    flex: 1,
    textAlign: 'center',
    marginTop: 30
  },
  body: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 350,
    },
  },
  loginBody: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      width: 300,
    }
  },
  button: {
    width: 300,
    marginTop: 25
  },
  loginButton: {
    width: 300,
    marginTop: 25
  },
  formControl: {
    margin: theme.spacing(2),
    width: 350,
  }
}))

export default function Form(props) {
  const classes = useStyles()

  if (props.type === 'insert-product') {
    return <InsertProductForm {...props} classes={classes} />
  }

  else if (props.type === 'insert-client') {
    return <InsertClientForm {...props} classes={classes} />
  }

  else if (props.type === 'edit-product') {
    return <EditProductForm {...props} classes={classes} onSubmit={(params) => props.onSubmit(params)} />
  }

  else if (props.type === 'login') {
    return <LoginForm {...props} classes={classes} onSubmit={(params) => props.onSubmit(params)} />
  }

  else if (props.type === 'register') {
    return <RegisterForm {...props} classes={classes} onSubmit={(params) => props.onSubmit(params)} />
  }

  return null
}