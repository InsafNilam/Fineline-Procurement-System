const Item = require("../Models/itemModel");

const createItem = (req, res) => {
  const { name, description, quantity, userId } = req.body;

  const newItem = new Item({
    name,
    description,
    quantity,
    userId,
  });
  newItem.save();
  return res.status(200).json({ msg: "Item has been Added" });
};

const getItemById = (req, res) => {
  Item.find({ userId: req.params.id }, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Retrieving Item Details :" + JSON.stringify(err, undefined, 2)
      );
  });
};

const deleteItemById = (req, res) => {
  Item.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Deleting Item Details :" + JSON.stringify(err, undefined, 2)
      );
  });
};

module.exports = {
  createItem,
  getItemById,
  deleteItemById,
};
