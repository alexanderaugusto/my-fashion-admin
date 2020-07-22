import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { inputValidation, functions } from '../../constants'
import api from '../../services/api'
import { Title, Link } from '../../components'

export default class InserClientForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: "",
        name: "",
        cpf: "",
        phone: ""
      },
      inserted: false
    }
  }

  checkData(e) {
    e.preventDefault()

    const { emailState, nameState, cpfState, phoneState } = this.state.data

    if (emailState === "has-success" && nameState === "has-success" && cpfState === "has-success" &&
      phoneState === "has-success") {
      this.insert()
    }

    else {
      this.props.alert("Dados inválidos! Verifique todos os campos inseridos.", "error")
    }
  }

  insert() {
    const { email, name, cpf, phone } = this.state.data
    const password = functions.generatePassword()
    this.setState({ data: { ...this.state.data, password } })
    const data = { email, name, cpf, phone, password }

    this.props.loading(true)
    api.request("post", api.routes.ROUTE_USER_INSERT, data, false, (cod, message) => {
      if (cod === 200) {
        this.setState({ inserted: true })
      }
      else {
        this.props.alert(message, "error")
      }

      this.props.loading(false)
    })
  }

  render() {
    const { classes } = this.props
    const { inserted } = this.state
    const { email, name, cpf, phone, password, emailState, nameState, cpfState, phoneState } = this.state.data

    if (inserted) {
      return (
        <div className={classes.form}>
          <Alert severity="success">{`O cliente ${name} foi cadastrado com sucesso.`}</Alert>
          <Title marginTop={30}>{password}</Title>
          <Link marginTop={20} onClick={() => this.setState({ data: {}, inserted: false })}>Cadastrar novo</Link>
        </div>
      )
    }

    return (
      <form noValidate autoComplete="off" className={classes.form} onSubmit={(e) => this.checkData(e)}>
        <div className={classes.body}>
          <TextField
            error={emailState === "has-danger"}
            required
            id="input-email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => this.setState({ data: inputValidation.email(e, this.state.data) })}
            onBlur={() => emailState !== "has-success" ? this.setState({ data: { ...this.state.data, emailState: "has-danger" } }) : null}
          />
          <TextField
            error={nameState === "has-danger"}
            required
            id="input-name"
            label="Nome"
            variant="outlined"
            value={name}
            onChange={(e) => this.setState({ data: inputValidation.name(e, this.state.data) })}
            onBlur={() => nameState !== "has-success" ? this.setState({ data: { ...this.state.data, nameState: "has-danger" } }) : null}
          />
          <TextField
            error={cpfState === "has-danger"}
            required
            id="input-cpf"
            label="CPF"
            variant="outlined"
            value={cpf}
            onChange={(e) => this.setState({ data: inputValidation.cpf(e, this.state.data) })}
            onBlur={() => cpfState !== "has-success" ? this.setState({ data: { ...this.state.data, cpfState: "has-danger" } }) : null}
          />
          <TextField
            error={phoneState === "has-danger"}
            required
            id="input-phone"
            label="Celular"
            variant="outlined"
            value={phone}
            onChange={(e) => this.setState({ data: inputValidation.phone(e, this.state.data) })}
            onBlur={() => phoneState !== "has-success" ? this.setState({ data: { ...this.state.data, phoneState: "has-danger" } }) : null}
          />
        </div>

        <Button type="submit" className={"main-color " + classes.button} size="large" color="primary"
          variant="contained">
          Cadastrar
        </Button>
      </form>
    )
  }
}