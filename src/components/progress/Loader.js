import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, CircularProgress } from '@material-ui/core'

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  },
  progress: {
    color: 'rgba(0, 153, 204, 1)'
  }
}))

export default function Loader({ isLoading }) {
  const classes = useStyles()

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isLoading}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isLoading}>
          <div className={classes.paper}>
            <CircularProgress className={classes.progress} />
          </div>
        </Fade>
      </Modal>
    </div>
  )
}