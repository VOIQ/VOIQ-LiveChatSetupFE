const Hashids = require('hashids/cjs');

module.exports.emptyObject = (object) => {
  if (object === null || object === undefined) return true;
  return Object.keys(object).length === 0 && object.constructor === Object;
}

module.exports.emptyArray = (array) => {
  if (array === null || array === undefined) return true;
  return Array.isArray(array) && array.length === 0;
}

module.exports.voicebotHashId = (voicebotId) => {
  const hashids = new Hashids('voiq', 10);
  return hashids.encode(voicebotId);
}
