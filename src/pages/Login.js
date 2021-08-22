import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Button } from '@material-ui/core'
import { Close, Minimize } from '@material-ui/icons'
import { Form, Title, Link } from '../components'
import api from '../services/api'

const useStyles = makeStyles(theme => ({
  imageContainer: {
    height: 600,
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '62.5%'
  },
  header: {
    textAlign: 'right'
  },
  icon: {
    color: 'rgba(0, 153, 204, 1)'
  },
  buttonGoBack: {
    borderColor: 'rgba(0, 153, 204, 1)',
    color: 'rgba(0, 153, 204, 1)'
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 60
  }
}))

export default function Login(props) {
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const windowProp = require('electron').remote.getCurrentWindow()

  const renderLogin = () => {
    return (
      <div>
        <div className={classes.header}>
          <IconButton className={classes.icon} size="small" onClick={() => windowProp.minimize()}>
            <Minimize style={{ marginBottom: 10 }} />
          </IconButton>
          <IconButton className={classes.icon} size="small" onClick={() => window.close()}>
            <Close />
          </IconButton>

        </div>

        <div className={classes.logo}>
          <img src={api.routes.IMAGE_PATH_PRODUCT + 'logo.webp'} alt="logo" width="160" height="50" />
        </div>

        <Title fontSize={16} marginBottom={-30} marginLeft={5}>Não possui uma conta? {" "}
          <span>
            <Link onClick={() => setPage(2)}> Cadastrar</Link>
          </span>
        </Title>

        <Form {...props} type="login" onSubmit={() => props.setRoute("/home")} />
      </div>
    )
  }

  const renderRegister = () => {
    return (
      <div>
        <div className={classes.header}>
          <Button variant="outlined" className={classes.buttonGoBack} onClick={() => setPage(1)}>
            Entrar
          </Button>
        </div>

        <div className={classes.logo}>
          <img src={api.routes.IMAGE_PATH_PRODUCT + 'logo.webp'} alt="logo" width="160" height="50" />
        </div>

        <Form {...props} type="register" onSubmit={() => setPage(1)} />
      </div>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} className={classes.imageContainer}>
        <img src={api.routes.IMAGE_PATH_PRODUCT + 'bg-login.webp'} className={classes.bgImage} alt="bg-login" height="100%" />
      </Grid>
      <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
        {page === 1 ? renderLogin() : renderRegister()}
      </Grid>
    </Grid>
  )
}