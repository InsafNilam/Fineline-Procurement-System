const Supplier = require("../Models/supplierModel");

const createSupplier = (req, res) => {
  const { name, company, description, address } = req.body;

  Supplier.findOne({ company })
    .then((supplier) => {
      if (supplier)
        return res
          .status(400)
          .json({ msg: "You have already added this supplier" });

      const newSupplier = new Supplier({
        name,
        company,
        description,
        address,
      });
      newSupplier.save();
      return res.status(200).json({ msg: "Supplier has been Added" });
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteSupplier = (req, res) => {
  Supplier.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Deleting Supplier Details :" +
          JSON.stringify(err, undefined, 2)
      );
  }).catch((e) => console.log(e));
};

const getSupplier = (req, res) => {
  Supplier.find((err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Retrieving Supplier Details :" +
          JSON.stringify(err, undefined, 2)
      );
  });
};
module.exports = {
  createSupplier,
  deleteSupplier,
  getSupplier,
};
