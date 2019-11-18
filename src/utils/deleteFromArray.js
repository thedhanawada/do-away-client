const deleteFromArray = (item, array) => {
  var index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array
}

export default deleteFromArray;