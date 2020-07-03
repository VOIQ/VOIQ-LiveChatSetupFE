module.exports.emptyObject = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
}

module.exports.emptyArray = (array) => {
  return Array.isArray(array) && array.length === 0;
}