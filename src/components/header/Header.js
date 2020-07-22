import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core'
import { Close, CropSquare, Minimize, FilterNone } from '@material-ui/icons'
import { HeaderMenu, ModalLogout } from '../../components'

import routes from '../../routes'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    flexGrow: 1,
  },
}))

export default function Header({ activeRoute, setRoute }) {
  const classes = useStyles()
  const [maximizeIcon, setMaximizeIcon] = useState(<CropSquare />)
  const [modalLogoutOpen, setModalLogoutOpen] = useState(false)
  const windowProp = require('electron').remote.getCurrentWindow()

  function maximize() {
    if (windowProp.isMaximized()) {
      setMaximizeIcon(<CropSquare />)
      windowProp.restore()
    }
    else {
      setMaximizeIcon(<FilterNone />)
      windowProp.maximize()
    }
  }

  return (
    <div className={classes.root}>
      <ModalLogout isOpen={modalLogoutOpen} setRoute={setRoute} toggle={() => setModalLogoutOpen(false)} />

      <AppBar position="static" className="main-color">
        <Toolbar >
          <Toolbar className={classes.menu}>
            {routes.map((item, index) => <HeaderMenu key={index} item={item} activeRoute={activeRoute} setRoute={setRoute} />)}
          </Toolbar>

          <IconButton color="inherit" size="small" onClick={() => windowProp.minimize()}>
            <Minimize style={{ marginBottom: 10 }} />
          </IconButton>
          <IconButton color="inherit" size="small" onClick={() => maximize()}>
            {maximizeIcon}
          </IconButton>
          <IconButton color="inherit" size="small" onClick={() => setModalLogoutOpen(true)}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}