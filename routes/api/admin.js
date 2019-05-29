const express = require("express");
const router = express.Router();

const Admin = require("../../models/Admin");

router.get("/show", (req, res) => res.json({ msg: "All Hostels showed" }));

router.get("/", (req, res) => {
  Admin.find()
    .sort({ _id: -1 })
    .then(adm => res.json(adm))
    .catch(err => res.status(404));
});

router.post("/register", (req, res) => {
  const newHostel = new Admin({
    hostel: req.body.hostel,
    city: req.body.city,
    area: req.body.area,
    info: req.body.info,
    address: req.body.address,
    land1: req.body.land1,
    land2: req.body.land2
  });

  newHostel
    .save()
    .then(hostel => res.json(hostel))
    .catch(err => console.log(err));
});

router.post("/token", (req, res) => {
  res.send("Token received");
  console.log(req.json());
});

module.exports = router;
