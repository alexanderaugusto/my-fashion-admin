import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

export default function HeaderMenu({ item, activeRoute, setRoute }) {
  const [anchorEl, setAnchorEl] = useState(null)

  function handleClick(e) {
    if (item.haveChild)
      setAnchorEl(e.currentTarget)
    else
      goToPage(item.route)
  }

  function goToPage(route) {
    setAnchorEl(null)
    setRoute(route)
  }

  return (
    <div className={activeRoute.includes(item.route) ? "header-menu-active" : ""}>
      <Button aria-controls="simple-menu" aria-haspopup={true} onClick={(e) => handleClick(e)}>
        <span className="header-button-title">{item.headerTitle}</span>
        {item.haveChild && <ArrowDropDownIcon className="header-button-title" />}
      </Button>

      {item.haveChild &&
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          className="header-menu"
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {item.component.map((item, index) => <MenuItem key={index} onClick={() => goToPage(item.route)}>{item.headerTitle}</MenuItem>)}
        </Menu>}
    </div>
  )
}