const AddressRouter = require("express").Router();
const { Address, Users } = require("../models");
const authenticate = require("../authentication");
const mongoose = require("mongoose");

AddressRouter.route("/")
  .get(authenticate.verifyUser, (req, res) => {
    Address.find({ u_id: req.user.id }).then(
      (data) => {
        res.statusCode = 200;
        res.setHeader("ContentType", "applciation/json");
        res.json(data);
      },
      (err) => next(err)
    );
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    const u_id = req.user.id;
    const {
      addressLine1,
      addressLine2,
      city,
      post_code,
      country,
      country_code,
    } = req.body.address;
    let telephone = "";
    let mobile = "";
    if (req.body.telephone) telephone = req.body.telephone;
    if (req.body.address.mobile) mobile = req.body.address.mobile;
    Address.create({
      u_id,
      addressLine1,
      addressLine2,
      city,
      post_code,
      country,
      telephone,
      mobile,
      country_code,
    }).then((address) => {
      Users.findByIdAndUpdate(
        { _id: u_id },
        { $push: { address: address } },
        { new: true, runValidators: true }
      )
        .then((user) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(user);
        })
        .catch((e) => next(e));
    });
  });
AddressRouter.route("/:id")
  .get(authenticate.verifyUser, (req, res, next) => {
    Address.findById(req.params.id)
      .then((address) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(address);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    const { id } = req.params;
    Address.findByIdAndUpdate({ _id: id }, { $set: req.body.address }).then(
      (data) => {
        res.statusCode = 200;
        res.setHeader("ContentType", "application/json");
        res.json(data);
      }
    );
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    const { id } = req.params;
    Address.findByIdAndDelete({ _id: id }, { $pull: id })
      .then((data) => {
        Users.findOneAndUpdate(
          { _id: req.user.id },
          { $pull: { address: mongoose.Types.ObjectId(id) } }
        ).then((user) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(data);
        });
      })
      .catch((err) => next(err));
  });

module.exports = AddressRouter;
