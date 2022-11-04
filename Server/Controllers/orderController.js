const Order = require("../Models/orderModule");

const createOrder = (req, res) => {
  const {
    siteName,
    supplierName,
    buyerName,
    phone,
    deliverAddress,
    deliverDate,
    userID,
    items,
  } = req.body;

  const newOrder = new Order({
    siteName,
    supplierName,
    buyerName,
    phone,
    deliverAddress,
    deliverDate,
    userID,
    items,
  });
  newOrder.save();
  return res.status(200).json({ msg: "Order has been Added" });
};

const getOrderById = (req, res) => {
  Order.find({ userId: req.params.id }, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Retrieving Order Details :" +
          JSON.stringify(err, undefined, 2)
      );
  });
};

const deleteOrderById = (req, res) => {
  Order.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Deleting Order Details :" + JSON.stringify(err, undefined, 2)
      );
  });
};

module.exports = {
  createOrder,
  getOrderById,
  deleteOrderById,
};
