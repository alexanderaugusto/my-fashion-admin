import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import api from '../../services/api'

export default class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: "",
        password: ""
      }
    }
  }

  checkData(e) {
    e.preventDefault()

    const { email, password } = this.state.data

    if (email !== "" && password !== "") {
      this.login()
    }

    else {
      this.props.alert("Dados inválidos! Verifique todos os campos inseridos.", "error", 5000, 'top', 'right')
    }
  }

  login() {
    const { email, password } = this.state.data
    const data = { email, password }

    this.props.loading(true)
    api.request("post", api.routes.ROUTE_LOGIN, data, null, (cod, message, dataReturned) => {
      if (cod === 200) {
        localStorage.setItem("user-token", JSON.stringify(dataReturned.token))
        this.props.onSubmit()
      }
      else {
        this.props.alert(message, "error", 5000, 'top', 'right')
      }

      this.props.loading(false)
    })
  }

  render() {
    const { classes } = this.props
    const { email, password } = this.state.data

    return (
      <form noValidate autoComplete="off" className={classes.form} onSubmit={(e) => this.checkData(e)}>
        <div className={classes.loginBody}>
          <TextField
            id="input-email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => this.setState({ data: { ...this.state.data, email: e.target.value } })}
          />
          <TextField
            type="password"
            id="input-password"
            label="Senha"
            variant="outlined"
            value={password}
            onChange={(e) => this.setState({ data: { ...this.state.data, password: e.target.value } })}
          />
        </div>

        <Button type="submit" className={"main-color " + classes.loginButton} size="large" color="primary"
          variant="contained">
          Entrar
        </Button>
      </form>
    )
  }
}