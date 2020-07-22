function email(e, data) {
  let dataInfos = data
  dataInfos["email"] = e.target.value
  let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRex.test(e.target.value)) {
    dataInfos["emailState"] = "has-success"
  } else {
    dataInfos["emailState"] = ""
  }

  return dataInfos
}

function name(e, data) {
  let dataInfos = data
  dataInfos["name"] = e.target.value

  if (e.target.value.length >= 3) {
    dataInfos["nameState"] = "has-success"
  } else {
    dataInfos["nameState"] = ""
  }

  return dataInfos
}

function password(e, data) {
  let dataInfos = data
  dataInfos["password"] = e.target.value

  if (e.target.value.length >= 8) {
    dataInfos["passwordState"] = "has-success"
    if (e.target.value === dataInfos.confirmPassword)
      dataInfos["confirmPasswordState"] = "has-success"
    else if (e.target.value !== dataInfos.confirmPassword && dataInfos.confirmPassword.length >= 5)
      dataInfos["confirmPasswordState"] = ""
  } else {
    dataInfos["passwordState"] = ""
  }

  return dataInfos
}

function confirmPassword(e, data) {
  let dataInfos = data
  dataInfos["confirmPassword"] = e.target.value

  if (e.target.value === dataInfos.password && e.target.value.length >= 8) {
    dataInfos["confirmPasswordState"] = "has-success"
  } else {
    dataInfos["confirmPasswordState"] = ""
  }

  return dataInfos
}

function phone(e, data) {
  if (e.target.value.length > 14)
    return data

  let dataInfos = data
  dataInfos["phone"] = mTel(e.target.value)

  if (dataInfos.phone.length === 14) {
    dataInfos["phoneState"] = "has-success";
  } else {
    dataInfos["phoneState"] = "";
  }

  return dataInfos
}

function cpf(e, data) {
  if (e.target.value.length > 14)
    return data

  let dataInfos = data
  dataInfos["cpf"] = mCpf(e.target.value)

  if (dataInfos.cpf.length === 14) {
    dataInfos["cpfState"] = "has-success";
  } else {
    dataInfos["cpfState"] = "";
  }

  return dataInfos
}

function cnpj(e, data) {
  if (e.target.value.length > 18)
    return data

  let dataInfos = data
  dataInfos["cnpj"] = mCNPJ(e.target.value)

  if (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(dataInfos["cnpj"]))
    dataInfos["cnpjState"] = "has-success"
  else
    dataInfos["cnpjState"] = "has-danger"

  return dataInfos
}

function address(e, data) {
  let dataInfos = data
  dataInfos["address"] = e.target.value;

  if (e.target.value.length >= 3) {
    dataInfos["addressState"] = "has-success"
  } else {
    dataInfos["addressState"] = ""
  }

  return dataInfos
}

function street(e, data) {
  let dataInfos = data
  dataInfos["street"] = e.target.value;

  if (e.target.value.length >= 3) {
    dataInfos["streetState"] = "has-success";
  } else {
    dataInfos["streetState"] = "";
  }

  return dataInfos
}

function neighborhood(e, data) {
  let dataInfos = data
  dataInfos["neighborhood"] = e.target.value;

  if (e.target.value.length >= 3) {
    dataInfos["neighborhoodState"] = "has-success";
  } else {
    dataInfos["neighborhoodState"] = "";
  }

  return dataInfos
}

function number(e, data) {
  let dataInfos = data
  dataInfos["number"] = e.target.value;

  if (e.target.value.length !== 0) {
    dataInfos["numberState"] = "has-success";
  } else {
    dataInfos["numberState"] = "";
  }

  return dataInfos
}

function city(e, data) {
  let dataInfos = data
  dataInfos["city"] = e.target.value;

  if (e.target.value.length >= 3) {
    dataInfos["cityState"] = "has-success";
  } else {
    dataInfos["cityState"] = "";
  }

  return dataInfos
}

function state(e, data) {
  let dataInfos = data
  dataInfos["state"] = e.target.value;

  if (e.target.value.length >= 2) {
    dataInfos["stateState"] = "has-success";
  } else {
    dataInfos["stateState"] = "";
  }

  return dataInfos
}

function zipcode(e, data) {
  if (e.target.value.length > 9)
    return data

  let dataInfos = data
  dataInfos["zipcode"] = mZipcode(e.target.value);

  if (e.target.value.length === 9) {
    dataInfos["zipcodeState"] = "has-success";
  } else {
    dataInfos["zipcodeState"] = "";
  }

  return dataInfos
}

function complement(e, data) {
  let dataInfos = data
  dataInfos["complement"] = e.target.value;
  dataInfos["complementState"] = "has-success";

  return dataInfos
}

function dateOfBirth(e, data) {
  let dataInfos = data
  dataInfos["dateOfBirth"] = e.target.value;

  if (dataInfos.dateOfBirth.length === 10)
    dataInfos["dateOfBirthState"] = "has-success";
  else
    dataInfos["dateOfBirthState"] = "";

  return dataInfos
}

function cardNumber(e, data) {
  let dataInfos = data
  dataInfos["number"] = mCardNumber(e.target.value)

  if (dataInfos.number.length === 19)
    dataInfos["numberState"] = "has-success"
  else
    dataInfos["numberState"] = ""

  return dataInfos
}

function cardName(e, data) {
  let dataInfos = data
  dataInfos["name"] = e.target.value.toUpperCase()

  if (dataInfos.name.length >= 3)
    dataInfos["nameState"] = "has-success"
  else
    dataInfos["nameState"] = ""

  return dataInfos
}

function cardDate(e, data) {
  let dataInfos = data
  dataInfos["date"] = mDateMY(e.target.value, dataInfos.date)

  if (dataInfos.date.length === 5 || dataInfos.date.length === 7)
    dataInfos["dateState"] = "has-success"
  else
    dataInfos["dateState"] = ""

  return dataInfos
}

function cardCod(e, data) {
  let dataInfos = data
  dataInfos["cod"] = e.target.value

  if (dataInfos.cod.length === 3)
    dataInfos["codState"] = "has-success"
  else
    dataInfos["codState"] = ""

  return dataInfos
}

function productCod(e, data) {
  let dataInfos = data
  dataInfos["cod"] = e.target.value

  if (dataInfos.cod.length >= 1)
    dataInfos["codState"] = "has-success"
  else
    dataInfos["codState"] = ""

  return dataInfos
}

function productTitle(e, data) {
  let dataInfos = data
  dataInfos["title"] = e.target.value

  if (dataInfos.title.length >= 1)
    dataInfos["titleState"] = "has-success"
  else
    dataInfos["titleState"] = ""

  return dataInfos
}

function productPrice(e, data) {
  let dataInfos = data
  dataInfos["price"] = e.target.value

  if (dataInfos.price.length >= 1)
    dataInfos["priceState"] = "has-success"
  else
    dataInfos["priceState"] = ""

  return dataInfos
}

function productQuantity(e, data) {
  let dataInfos = data
  dataInfos["quantity"] = e.target.value

  if (dataInfos.quantity.length >= 1)
    dataInfos["quantityState"] = "has-success"
  else
    dataInfos["quantityState"] = ""

  return dataInfos
}

/* REGEX FOR VALIDATION */
function mTel(tel) {
  tel = tel.replace(/\D/g, "")
  tel = tel.replace(/^(\d)/, "($1")
  tel = tel.replace(/(.{3})(\d)/, "$1)$2")
  if (tel.length === 9) {
    tel = tel.replace(/(.{1})$/, "-$1")
  } else if (tel.length === 10) {
    tel = tel.replace(/(.{2})$/, "-$1")
  } else if (tel.length === 11) {
    tel = tel.replace(/(.{3})$/, "-$1")
  } else if (tel.length === 12) {
    tel = tel.replace(/(.{4})$/, "-$1")
  } else if (tel.length > 12) {
    tel = tel.replace(/(.{4})$/, "-$1")
  }
  return tel;
}

function mCpf(cpf) {
  cpf = cpf.replace(/\D/g, "")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  return cpf
}

function mZipcode(cep) {
  cep = cep.replace(/\D/g, "")
  cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
  cep = cep.replace(/\.(\d{3})(\d)/, "$1-$2")
  return cep
}

function mCardNumber(number) {
  var v = number.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{4,16}/g);
  var match = matches ? matches[0] : ""
  var parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  } else {
    return number
  }
}

function mDateMY(currentDate, oldDate) {
  if (currentDate.length === 0) {
    return currentDate
  }
  if (currentDate.length === 1) {
    return currentDate
  }
  else if (currentDate.length === 2) {
    return currentDate
  }
  else if (currentDate.length === 3 && oldDate.length === 2) {
    return oldDate + "/" + currentDate.substring(currentDate.length - 1, currentDate.length)
  }
  else if (currentDate.length === 3 && oldDate.length === 4) {
    return currentDate.substring(0, 2)
  }
  else if (!currentDate.includes("/"))
    return oldDate

  return currentDate
}

function mCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "")
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")
  return cnpj
}

export default {
  email,
  name,
  password,
  confirmPassword,
  phone,
  cpf,
  cnpj,
  street,
  address,
  neighborhood,
  number,
  city,
  state,
  zipcode,
  complement,
  dateOfBirth,
  cardNumber,
  cardName,
  cardDate,
  cardCod,
  productCod,
  productPrice,
  productTitle,
  productQuantity
}