let mongoose = require("mongoose");

let Notification = new mongoose.Schema({
  notificationId: { type: Number },
  createdOn: { type: Date },
  content: { type: String },
});

module.exports = mongoose.model("Notification", Notification);
