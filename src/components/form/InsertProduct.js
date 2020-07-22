import React, { Component } from 'react'
import {
  TextField,
  Button,
  MobileStepper,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
  Badge
} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight, PhotoCamera } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import { inputValidation } from '../../constants'
import { Title, Link, ImageUpload } from '../../components'
import api from '../../services/api'

const styles = {
  button_category: {
    width: 100,
    height: 100,
    fontSize: 30
  },
  grid_container: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 25,
    paddingBottom: 50
  },
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 270,
    backgroundColor: 'rgba(128,128,128, 0.05)'
  },
  inputFile: {
    display: 'none'
  },
  labelFile: {
    backgroundColor: 'rgba(128,128,128, 0.5)',
    width: 76,
    height: 76,
    color: 'white',
    borderRadius: 0
  },
  badgeIcon: {
    color: 'white',
    cursor: 'pointer'
  },
  productImage: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey"
  }
}

export default class InsertProductForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        cod: "",
        title: "",
        price: "",
        quantity: "",
        category: "",
        brand: "",
        images: []
      },
      activeStep: 0,
      categories: [],
      subcategories: [],
      brands: [],
      inserted: false
    }
  }

  componentDidMount() {
    const config = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
      }
    }

    this.props.loading(true)
    api.request("get", api.routes.ROUTE_CATEGORY_LIST_ALL, null, config, (cod, message, categories) => {
      this.props.loading(false)

      if (cod === 200) {
        this.setState({ categories })
      } else {
        this.props.alert(message, "error")
      }
    })
  }

  handleNext() {
    const { activeStep } = this.state

    if (activeStep === 0) {
      this.setState({ activeStep: this.state.activeStep + 1 })
    }
    else if (activeStep === 1) {
      this.getBrands()
      this.setState({ activeStep: this.state.activeStep + 1 })
    }
    else if (activeStep === 2) {
      this.setState({ activeStep: this.state.activeStep + 1 })
    }
    else if (activeStep === 3) {
      this.setState({ activeStep: this.state.activeStep + 1 })
    }
    else if (activeStep === 4) {
      this.insert()
    }
  }

  handleBack() {
    const { activeStep, data } = this.state

    if (activeStep === 1) {
      this.setState({ data: { ...data, category: "" } })
    }
    else if (activeStep === 2) {
      this.setState({ data: { ...data, brand: "" } })
    }

    this.setState({ activeStep: this.state.activeStep - 1 })
  }

  getBrands() {
    const config = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token")),
      }
    }

    this.props.loading(true)
    api.request("get", api.routes.ROUTE_BRAND_LIST_ALL, null, config, (cod, message, brands) => {
      this.props.loading(false)

      if (cod === 200) {
        this.setState({ brands })
      } else {
        this.props.alert(message, "error")
      }
    })
  }

  insert() {
    const { cod, title, price, quantity, category: category_id, brand: brand_id, images } = this.state.data
    const product = { cod, title, price, quantity, category_id, brand_id }
    const files = images

    const data = new FormData()
    data.append("product", JSON.stringify(product))

    for (const file of files) {
      data.append('files', file)
    }

    const config = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token")),
        'Content-Type': 'multipart/form-data'
      }
    }

    this.props.loading(true)
    api.request("post", api.routes.ROUTE_PRODUCT_INSERT, data, config, (cod, message) => {
      if (cod === 200) {
        this.setState({ inserted: true })
      }
      else {
        this.props.alert(message, "error", 5000)
      }

      this.props.loading(false)
    })
  }

  renderStep0 = () => {
    const { categories } = this.state

    return (
      <div>
        <Title fontSize={22}>Em qual categoria o produto se encaixa?</Title>
        <Grid container spacing={1} style={styles.grid_container}>
          {
            categories.map((category, index) => {
              const style = { ...styles.button_category, backgroundColor: "#" + ((1 << 24) * Math.random() | 0).toString(16) }
              return (
                <Grid key={index} item xs={4}>
                  <div>
                    <Fab color="primary" aria-label="add" style={style} onClick={() => {
                      this.handleNext()

                      const config = {
                        headers: {
                          "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token")),
                        },
                        params: { id: category.id }
                      }

                      this.props.loading(true)
                      api.request("get", api.routes.ROUTE_CATEGORY_LIST, null, config, (cod, message, { subcategories }) => {
                        this.props.loading(false)

                        if (cod === 200) {
                          this.setState({ subcategories })
                        } else {
                          this.props.alert(message, "error")
                        }
                      })
                    }}>
                      <i className={category.image} />
                    </Fab>
                    <Title fontSize={20}>{category.name}</Title>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    )
  }

  renderStep1 = () => {
    const { subcategories, data } = this.state

    return (
      <div style={styles.grid_container}>
        <Title fontSize={22}>Escolha uma categoria:</Title>

        <List style={styles.list} component="nav" aria-label="main mailbox folders">
          {
            subcategories.map((subcategory, index) => {
              return (
                <ListItem
                  key={index}
                  button
                  selected={data.category === subcategory.id}
                  onClick={() => this.setState({ data: { ...data, category: subcategory.id } })}
                >
                  <ListItemText primary={subcategory.name} />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }

  renderStep2 = () => {
    const { brands, data } = this.state

    return (
      <div style={styles.grid_container}>
        <Title fontSize={22}>Qual a marca do produto?</Title>

        <List style={styles.list} component="nav" aria-label="main mailbox folders">
          {
            brands.map((brand, index) => {
              return (
                <ListItem
                  key={index}
                  button
                  selected={data.brand === brand.id}
                  onClick={() => this.setState({ data: { ...data, brand: brand.id } })}
                >
                  <ListItemText primary={brand.name} />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }

  renderStep3 = () => {
    const { cod, title, price, quantity, codState, titleState, priceState, quantityState } = this.state.data
    const { classes } = this.props

    return (
      <div className={classes.body}>
        <Title fontSize={22}>Insira as características do produto</Title>

        <TextField
          error={codState === "has-danger"}
          required
          id="input-cod"
          label="Código"
          variant="outlined"
          value={cod}
          onChange={(e) => this.setState({ data: inputValidation.productCod(e, this.state.data) })}
          onBlur={() => codState !== "has-success" ? this.setState({ data: { ...this.state.data, codState: "has-danger" } }) : null}
        />
        <TextField
          error={titleState === "has-danger"}
          required
          id="input-title"
          label="Título"
          variant="outlined"
          value={title}
          onChange={(e) => this.setState({ data: inputValidation.productTitle(e, this.state.data) })}
          onBlur={() => titleState !== "has-success" ? this.setState({ data: { ...this.state.data, titleState: "has-danger" } }) : null}
        />
        <TextField
          error={priceState === "has-danger"}
          required
          id="input-price"
          label="Preço"
          variant="outlined"
          value={price}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
          onChange={(e) => this.setState({ data: inputValidation.productPrice(e, this.state.data) })}
          onBlur={() => priceState !== "has-success" ? this.setState({ data: { ...this.state.data, priceState: "has-danger" } }) : null}
        />
        <TextField
          error={quantityState === "has-danger"}
          required
          id="input-quantity"
          label="Quantidade"
          variant="outlined"
          value={quantity}
          InputProps={{
            endAdornment: <InputAdornment position="end">unidade(s)</InputAdornment>,
          }}
          onChange={(e) => this.setState({ data: inputValidation.productQuantity(e, this.state.data) })}
          onBlur={() => quantityState !== "has-success" ? this.setState({ data: { ...this.state.data, quantityState: "has-danger" } }) : null}
        />
      </div>
    )
  }

  renderStep4 = () => {
    const { data } = this.state

    return (
      <div>
        <Title fontSize={22}>Adicione imagens para esse produto</Title>

        <ImageUpload images={data.images} onChange={(images) => this.setState({ data: { ...data, images } })} />
      </div>
    )
  }

  render() {
    const { classes } = this.props
    const { activeStep, data, inserted } = this.state
    const { cod, codState, titleState, priceState, quantityState } = data
    const step = `renderStep${activeStep}`

    if (inserted) {
      return (
        <div className={classes.form}>
          <Alert severity="success">{`Produto #${cod} inserido com sucesso.`}</Alert>
          <Link marginTop={20} onClick={() => this.setState({ data: { images: [] }, inserted: false, activeStep: 0 })}>Inserir novo</Link>
        </div>
      )
    }

    return (
      <form noValidate autoComplete="off" className={classes.form} onSubmit={e => e.preventDefault()}>
        {this[step]()}

        <MobileStepper
          variant="dots"
          steps={5}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button type="submit" size="small" onClick={() => this.handleNext()} disabled={activeStep === 0 ||
              (activeStep === 1 && data.category === "") || (activeStep === 2 && data.brand === "")
              || (activeStep === 3 && !(codState === "has-success" && titleState === "has-success" && priceState === "has-success" &&
                quantityState === "has-success"))}>
              {activeStep === 4 ? "Finalizar" : "Continuar"}
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