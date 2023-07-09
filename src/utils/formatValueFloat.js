const formatValueFloat = (value) => {

  if (String(value).includes(",")) {
    value = value.replace(",", ".");
  }

  value = Number(value).toFixed(2);
  return Number(value);
}

export default formatValueFloat;