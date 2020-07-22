// Home component
import Home from './pages/Home'
// Sales components
import Sell from './pages/sales/Sell'
import MySales from './pages/sales/MySales'
// Product components
import NewProduct from './pages/products/NewProduct'
import MyProducts from './pages/products/MyProducts'
import ChangeProduct from './pages/products/ChangeProduct'
// Client components
import NewClient from './pages/clients/NewClient'
import ListClients from './pages/clients/ListClients'
// Login component
import Login from './pages/Login'

export default [
  {
    route: '/login',
    component: Login
  },
  {
    route: '/home',
    headerTitle: 'Home',
    component: Home
  },
  {
    route: '/sales',
    headerTitle: 'Vendas',
    haveChild: true,
    component: [
      {
        route: '/sales/sell',
        headerTitle: 'Vender produto',
        component: Sell
      },
      {
        route: '/sales/my-sales',
        headerTitle: 'Minhas vendas',
        component: MySales
      }
    ]
  },
  {
    route: '/products',
    headerTitle: 'Produtos',
    haveChild: true,
    component: [
      {
        route: '/products/new-product',
        headerTitle: 'Novo produto',
        component: NewProduct
      },
      {
        route: '/products/my-products',
        headerTitle: 'Meus produtos',
        component: MyProducts
      },
      {
        route: '/products/change-product',
        headerTitle: 'Trocar produto',
        component: ChangeProduct
      }
    ]
  },
  {
    route: '/clients',
    headerTitle: 'Clientes',
    haveChild: true,
    component: [
      {
        route: '/clients/new-client',
        headerTitle: 'Novo cliente',
        component: NewClient
      },
      {
        route: '/clients/list-clients',
        headerTitle: 'Listar clientes',
        component: ListClients
      }
    ]
  },
]