import React, { Component } from 'react'
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  Tooltip
} from '@material-ui/core'
import { Close, Check } from '@material-ui/icons';
import { inputValidation } from '../../constants'
import { Title, ImageUpload } from '../../components'
import api from '../../services/api'

const styles = {
  title: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 100
  },
  gridTitle: {
    flex: 1,
    textAlign: 'left'
  },
  gridIcons: {
    flex: 1,
    textAlign: 'right'
  },
  grid_container: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 25,
    paddingBottom: 50
  },
}

export default class EditProductForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        id: "",
        cod: "",
        title: "",
        price: "",
        quantity: "",
        category: "",
        subcategory: "",
        brand: "",
        images: [],
        codState: "has-success",
        titleState: "has-success",
        priceState: "has-success",
        quantityState: "has-success",
      },
      categories: [],
      subcategories: [],
      brands: [],
      imagesToRender: [],
      imagesToDelete: []
    }
  }

  componentDidMount() {
    let { id, cod, title, price, quantity, product_category, images } = this.props.itemToEdit
    const { category } = product_category
    const imagesToRender = []
    images.filter(image => imagesToRender.push(image))
    this.setState({ data: { ...this.state.data, id, cod, title, price, quantity }, imagesToRender })

    this.getCategories()
    this.getSubcategories(category.id)
    this.getBrands()
  }

  getCategories() {
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
        const { brand_id: brand } = this.props.itemToEdit
        let { id: subcategory, category } = this.props.itemToEdit.product_category
        this.setState({
          data: {
            ...this.state.data,
            category: category.id,
            subcategory,
            brand
          }
        })
      } else {
        this.props.alert(message, "error")
      }
    })
  }

  getSubcategories(id, setSubcategory) {
    const config = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token")),
      },
      params: { id }
    }

    this.props.loading(true)
    api.request("get", api.routes.ROUTE_CATEGORY_LIST, null, config, (cod, message, { subcategories }) => {
      this.props.loading(false)

      if (cod === 200) {
        this.setState({ subcategories })

        if (setSubcategory)
          this.setState({ data: { ...this.state.data, subcategory: subcategories[0].id } })
      } else {
        this.props.alert(message, "error")
      }
    })
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

  edit() {
    const { id, cod, title, price, quantity, subcategory: category_id, brand: brand_id, images } = this.state.data
    const product = { id, cod, title, price, quantity, category_id, brand_id }
    const files = images
    const { imagesToDelete } = this.state

    const data = new FormData()
    data.append("product", JSON.stringify(product))
    data.append("images_to_delete", JSON.stringify(imagesToDelete))

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
    api.request("post", api.routes.ROUTE_PRODUCT_EDIT, data, config, (cod, message) => {
      if (cod === 200) {
        this.props.alert("Produto alterado com sucesso", "success")
        this.props.onSubmit()
      }
      else {
        this.props.alert(message, "error", 5000)
      }

      this.props.loading(false)
    })
  }

  delete() {
    const { id } = this.state.data
    const { imagesToRender: images } = this.state

    const config = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token")),
      }
    }

    const data = { id, images }

    this.props.loading(true)
    api.request("post", api.routes.ROUTE_PRODUCT_DELETE, data, config, (cod, message) => {
      if (cod === 200) {
        this.props.alert("Produto apagado com sucesso", "success")
        this.props.onSubmit()
      }
      else {
        this.props.alert(message, "error", 5000)
      }

      this.props.loading(false)
    })
  }

  renderInputs = () => {
    const { cod, title, price, quantity, category, subcategory, brand, codState, titleState, priceState, quantityState } = this.state.data
    const { categories, subcategories, brands } = this.state
    const { classes } = this.props

    return (
      <div className={classes.body}>
        <div style={styles.title}>
          <Title fontSize={22} color="grey">Alterar dados</Title>
        </div>

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
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref="inputCategory" htmlFor="outlined-age-native-simple">
            Categoria
          </InputLabel>
          <Select
            native
            value={category}
            onChange={(e) => {
              this.setState({ data: { ...this.state.data, category: e.target.value } })
              this.getSubcategories(e.target.value, true)
            }}
            labelWidth={this.refs.inputCategory && this.refs.inputCategory.offsetWidth}
            inputProps={{
              name: 'category',
              id: 'outlined-age-native-simple',
            }}
          >
            {categories.map((category, index) => {
              return <option key={index} value={category.id}>{category.name}</option>
            })}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref="inputSubcategory" htmlFor="outlined-age-native-simple">
            Sub categoria
          </InputLabel>
          <Select
            native
            value={subcategory}
            onChange={(e) => {
              this.setState({ data: { ...this.state.data, subcategory: e.target.value } })
            }}
            labelWidth={this.refs.inputSubcategory && this.refs.inputSubcategory.offsetWidth}
            inputProps={{
              name: 'subcategory',
              id: 'outlined-age-native-simple',
            }}
          >
            {subcategories.map((subcategory, index) => {
              return <option key={index} value={subcategory.id}>{subcategory.name}</option>
            })}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref="inputBrand" htmlFor="outlined-age-native-simple">
            Marca
          </InputLabel>
          <Select
            native
            value={brand}
            onChange={(e) => {
              this.setState({ data: { ...this.state.data, brand: e.target.value } })
            }}
            labelWidth={this.refs.inputBrand && this.refs.inputBrand.offsetWidth}
            inputProps={{
              name: 'brand',
              id: 'outlined-age-native-simple',
            }}
          >
            {brands.map((brand, index) => {
              return <option key={index} value={brand.id}>{brand.name}</option>
            })}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderImages = () => {
    const { data, imagesToRender, imagesToDelete } = this.state

    return (
      <div>
        <div style={styles.title}>
          <Title marginTop={30} fontSize={22} color="grey">Adicionar imagens</Title>
        </div>
        <ImageUpload images={data.images} onChange={(images) => this.setState({ data: { ...data, images } })}
          initialImages={imagesToRender}
          onDeleteInitial={(image) => {
            const images = imagesToDelete
            images.push(image)
            this.setState({ imagesToDelete: images })
          }} />
      </div>
    )
  }

  render() {
    const { classes, onClose } = this.props
    const { cod } = this.state.data

    return (
      <form noValidate autoComplete="off" className={classes.form} onSubmit={e => e.preventDefault()}>
        <Grid container spacing={1} style={styles.grid_container}>
          <Grid style={styles.gridTitle}>
            <Title color="grey">{"#" + cod}</Title>
          </Grid>
          <Grid item styles={styles.gridIcons}>
            <Tooltip title="Salvar">
              <IconButton aria-label="delete" color="primary" onClick={() => this.edit()}>
                <Check />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fechar">
              <IconButton aria-label="delete" color="secondary" onClick={() => onClose()}>
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        {this.renderInputs()}

        {this.renderImages()}

        <Button className={classes.button} size="large" color="secondary"
          variant="contained" onClick={() => this.delete()}>
          Excluir produto
        </Button>
      </form>
    )
  }
}