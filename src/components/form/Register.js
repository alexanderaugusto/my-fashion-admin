import React, { Component } from 'react'
import { TextField, Button, MobileStepper } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { inputValidation } from '../../constants'
import api from '../../services/api'

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: "",
        password: "",
        confirmPassword: "",
        cnpj: "",
        phone: "",
        name: "",
        address: "",
        city: "",
        state: "",
        zipcode: ""
      },
      activeStep: 0
    }
  }

  insert() {
    const { email, password, name, cnpj, phone, address, city, state, zipcode } = this.state.data
    const data = { email, password, name, cnpj, phone, address, city, state, zipcode }

    this.props.loading(true)
    api.request("post", api.routes.ROUTE_COMPANY_INSERT, data, false, (cod, message) => {
      if (cod === 200) {
        this.props.onSubmit()
        this.props.alert("Empresa registada com sucesso! Faça login para acessar.", "success", 5000, 'top', 'right')
      }
      else {
        this.props.alert(message, "error", 5000, 'top', 'right')
      }

      this.props.loading(false)
    })
  }

  handleNext() {
    const { emailState, passwordState, confirmPasswordState, cnpjState, phoneState, nameState,
      addressState, cityState, stateState } = this.state.data

    if (this.state.activeStep === 0) {
      if (emailState === "has-success" && passwordState === "has-success" && confirmPasswordState === "has-success")
        this.setState({ activeStep: this.state.activeStep + 1 })
      else
        this.props.alert("Dados inválidos! Por favor, verifique todos os campos inseridos.", "error", 5000, 'top', 'right')
    }

    else if (this.state.activeStep === 1) {
      if (cnpjState === "has-success" && phoneState === "has-success" && nameState === "has-success")
        this.setState({ activeStep: this.state.activeStep + 1 })
      else
        this.props.alert("Dados inválidos! Por favor, verifique todos os campos inseridos.", "error", 5000, 'top', 'right')
    }

    else if (this.state.activeStep === 2) {
      if (addressState === "has-success" && cityState === "has-success" && stateState === "has-success")
        this.insert()
      else
        this.props.alert("Dados inválidos! Por favor, verifique todos os campos inseridos.", "error", 5000, 'top', 'right')
    }
  }

  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 })
  }

  renderStep1 = () => {
    const { email, password, confirmPassword, emailState, passwordState, confirmPasswordState } = this.state.data
    const { classes } = this.props

    return (
      <div className={classes.loginBody}>
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
          type="password"
          error={passwordState === "has-danger"}
          required
          id="input-password"
          label="Senha"
          variant="outlined"
          value={password}
          onChange={(e) => this.setState({ data: inputValidation.password(e, this.state.data) })}
          onBlur={() => passwordState !== "has-success" ? this.setState({ data: { ...this.state.data, passwordState: "has-danger" } }) : null}
        />
        <TextField
          type="password"
          error={confirmPasswordState === "has-danger"}
          required
          id="input-password"
          label="Confirmar senha"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => this.setState({ data: inputValidation.confirmPassword(e, this.state.data) })}
          onBlur={() => confirmPasswordState !== "has-success" ? this.setState({ data: { ...this.state.data, confirmPasswordState: "has-danger" } }) : null}
        />
      </div>
    )
  }

  renderStep2 = () => {
    const { cnpj, phone, name, cnpjState, phoneState, nameState } = this.state.data
    const { classes } = this.props

    return (
      <div className={classes.loginBody}>
        <TextField
          error={cnpjState === "has-danger"}
          required
          id="input-cnpj"
          label="CNPJ"
          variant="outlined"
          value={cnpj}
          onChange={(e) => this.setState({ data: inputValidation.cnpj(e, this.state.data) })}
          onBlur={() => cnpjState !== "has-success" ? this.setState({ data: { ...this.state.data, cnpjState: "has-danger" } }) : null}
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
          error={phoneState === "has-danger"}
          required
          id="input-phone"
          label="Telefone"
          variant="outlined"
          value={phone}
          onChange={(e) => this.setState({ data: inputValidation.phone(e, this.state.data) })}
          onBlur={() => phoneState !== "has-success" ? this.setState({ data: { ...this.state.data, phoneState: "has-danger" } }) : null}
        />
      </div>
    )
  }

  renderStep3 = () => {
    const { address, city, state, zipcode, addressState, cityState, stateState, zipcodeState} = this.state.data
    const { classes } = this.props

    return (
      <div className={classes.loginBody}>
        <TextField
          error={addressState === "has-danger"}
          required
          id="input-address"
          label="Endereço"
          variant="outlined"
          value={address}
          onChange={(e) => this.setState({ data: inputValidation.address(e, this.state.data) })}
          onBlur={() => addressState !== "has-success" ? this.setState({ data: { ...this.state.data, addressState: "has-danger" } }) : null}
        />
        <TextField
          error={cityState === "has-danger"}
          required
          id="input-city"
          label="Cidade"
          variant="outlined"
          value={city}
          onChange={(e) => this.setState({ data: inputValidation.city(e, this.state.data) })}
          onBlur={() => cityState !== "has-success" ? this.setState({ data: { ...this.state.data, cityState: "has-danger" } }) : null}
        />
        <TextField
          error={stateState === "has-danger"}
          required
          id="input-state"
          label="Estado"
          variant="outlined"
          value={state}
          onChange={(e) => this.setState({ data: inputValidation.state(e, this.state.data) })}
          onBlur={() => stateState !== "has-success" ? this.setState({ data: { ...this.state.data, stateState: "has-danger" } }) : null}
        />
        <TextField
          error={zipcodeState === "has-danger"}
          required
          id="input-state"
          label="CEP"
          variant="outlined"
          value={zipcode}
          onChange={(e) => this.setState({ data: inputValidation.zipcode(e, this.state.data) })}
          onBlur={() => zipcodeState !== "has-success" ? this.setState({ data: { ...this.state.data, zipcodeState: "has-danger" } }) : null}
        />
      </div>
    )
  }

  render() {
    const { classes } = this.props
    const { activeStep } = this.state

    return (
      <form noValidate autoComplete="off" className={classes.form} onSubmit={e => e.preventDefault()}>
        {activeStep === 0 ? this.renderStep1() : (activeStep === 1 ? this.renderStep2() : this.renderStep3())}

        <MobileStepper
          variant="dots"
          steps={3}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button type="submit" size="small" onClick={() => this.handleNext()}>
              {activeStep === 2 ? "Finalizar" : "Continuar"}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={() => this.handleBack()} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Voltar
              </Button>
          }
        />
      </form>
    )
  }
}