const Site = require("../Models/siteModel");

const createSite = (req, res) => {
  const { name, description, address } = req.body;

  Site.findOne({ name })
    .then((site) => {
      if (site)
        return res
          .status(400)
          .json({ msg: "You have already added this site" });

      const newSite = new Site({
        name,
        description,
        address,
      });
      newSite.save();
      return res.status(200).json({ msg: "Site has been Added" });
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteSite = (req, res) => {
  Site.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Deleting Site Details :" + JSON.stringify(err, undefined, 2)
      );
  }).catch((e) => console.log(e));
};

const getSite = (req, res) => {
  Site.find((err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Retrieving Site Details :" + JSON.stringify(err, undefined, 2)
      );
  });
};
module.exports = {
  createSite,
  deleteSite,
  getSite,
};
