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
  const id = hashids.encode(1, 2, 3) // o2fXhV
  const numbers = hashids.decode(id) // [1, 2, 3]
  console.log(id);
  console.log(numbers);
  console.log("VOICEBOT ID");
  console.log(voicebotId);
  console.log(hashids.encode(voicebotId));
  return hashids.encode(voicebotId);
}
