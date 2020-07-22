import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Grid, Button, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Title } from '../../components'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 15,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
    outline: 'none'
  },
  buttonClose: {
    borderColor: 'rgba(0, 153, 204, 1)',
    color: 'rgba(0, 153, 204, 1)'
  },
  header: {
    flex: 1,
    textAlign: 'right'
  },
  icon: {
    color: 'rgba(0, 153, 204, 1)'
  },
  buttons: {
    marginTop: 15
  }
}))

export default function ModalLogout({ isOpen, setRoute, toggle }) {
  const classes = useStyles()

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <div className={classes.header}>
            <IconButton className={classes.icon} size="small" onClick={() => toggle()}>
              <Close />
            </IconButton>
          </div>

          <Title>Sair da Conta</Title>
          <Title fontSize={16} color="grey" marginBottom={10}>Deseja fechar o aplicativo ou encerrar sua sessão?</Title>

          <Grid container spacing={0} className={classes.buttons}>
            <Grid item xs={12} sm={6} >
              <Button className="main-color" size="large" color="primary" variant="contained"
                onClick={() => {
                  localStorage.clear()
                  setRoute('/login')
                  toggle()
                }}>
                Sair
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" className={classes.buttonClose} onClick={() => setPage(1)}
                onClick={() => {
                  window.close()
                  toggle()
                }}>
                Fechar aplicativo
            </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  )
}