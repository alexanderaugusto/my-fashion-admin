import axios from 'axios'

const baseURL = "https://centralmodas-backend.herokuapp.com"

const axiosCreated = axios.create({
  baseURL
})

const routes = {
  // Images
  IMAGE_PATH_PRODUCT: 'https://centralmodas-backend.herokuapp.com/files/',
  IMAGE_PATH_USER: 'https://centralmodas-backend.herokuapp.com/files/',
  // Auth
  ROUTE_LOGIN: "/company/login",
  // User routes
  ROUTE_USER_INSERT: "/user/create",
  // Company routes
  ROUTE_COMPANY_INSERT: "/company/create",
  ROUTE_COMPANY_LIST_USERS: "/company/list_users",
  ROUTE_COMPANY_LIST_SALES: "/company/list_sales",
  ROUTE_COMPANY_LIST_PRODUCTS: "/company/list_products",
  // Product routes
  ROUTE_PRODUCT_INSERT: "/product/create",
  ROUTE_PRODUCT_EDIT: "/product/update",
  ROUTE_PRODUCT_DELETE: "/product/delete",
  // Category routes
  ROUTE_CATEGORY_LIST_ALL: "/category/list_all",
  ROUTE_CATEGORY_LIST: "/category/list",
  // Brand routes
  ROUTE_BRAND_LIST_ALL: "/brand/list_all"
}

const request = (type, route, data, config, callback) => {
  if (type === "get") {
    axiosCreated[type](route, config)
      .then((response) => {
        if (callback)
          callback(200, null, response.data)
      })
      .catch((error) => {
        if (callback) {
          if (error.toString().includes("400")) {
            callback(400, "Um erro ocorreu! Por favor, verifique todos os campos inseridos.")
          }
          else if (error.toString().includes("401")) {
            callback(401, "Você precisa estar autenticado para relizar essa operação.")
          }
          else if (error.toString().includes("404")) {
            callback(404, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
          }
          else if (error.toString().includes("409")) {
            callback(409, "Este email já foi cadastrado anteriormente.")
          }
          else if (error.toString().includes("402")) {
            callback(402, "Email ou senha incorretos.")
          }
          else if (error.toString().includes("500")) {
            callback(500, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
          }
          else {
            callback(500, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
          }
        }

        console.log(error)
      })
  } else {
    axiosCreated[type](route, data, config)
      .then((response) => {
        if (callback)
          callback(200, null, response.data)
      })
      .catch((error) => {
        if (callback) {
          if (error.toString().includes("400")) {
            callback(400, "Um erro ocorreu! Por favor, verifique todos os campos inseridos.")
          }
          else if (error.toString().includes("401")) {
            callback(401, "Você precisa estar autenticado para relizar essa operação.")
          }
          else if (error.toString().includes("404")) {
            callback(404, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
          }
          else if (error.toString().includes("409")) {
            callback(409, "Este email já foi cadastrado anteriormente.")
          }
          else if (error.toString().includes("402")) {
            callback(402, "Email ou senha incorretos.")
          }
          else if (error.toString().includes("500")) {
            callback(500, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
          }
          else {
            callback(500, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
          }
        }

        console.log(error)
      })
  }
}


export default {
  request,
  routes
}