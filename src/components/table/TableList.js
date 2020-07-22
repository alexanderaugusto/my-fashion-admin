import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  }
})

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgba(0, 153, 204, 1)',
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export default function TableList({ columns, items, renderTotal, onClick }) {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getSubtotal = () => {
    let subtotal = 0
    items.filter(item => subtotal = subtotal + (item.product.buy_quantity * item.product.price))
    return subtotal
  }

  const getDiscount = () => {
    let discount = 0
    items.filter(item => discount = discount + item.product.discount)
    return discount
  }

  const getTotal = () => {
    const total = getSubtotal() - getDiscount()
    return total
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={key} onClick={() => onClick(row)} style={{ cursor: 'pointer' }}>
                  {columns.map((column, key) => {
                    const value = row[column.id]

                    return (
                      <TableCell key={key} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}

            {!renderTotal ? null :
              <>
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={4}>Subtotal</TableCell>
                  <TableCell align="right">{getSubtotal().toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Descontos</TableCell>
                  <TableCell align="right">{getDiscount().toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell align="right">{getTotal().toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                </TableRow>
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count !== -1 ? count : 'more than' + to}`}
        nextIconButtonText="Próxima página"
        backIconButtonText="Página anterior"
      />
    </Paper>
  )
}