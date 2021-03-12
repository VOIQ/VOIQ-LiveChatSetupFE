module.exports.getIdOfItem = (itemId) => {
  //Item id is saved as "item-id"  
  return itemId.split("-")[1];
}
