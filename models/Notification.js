var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: String,
  description: String
});

module.exports = mongoose.model('Notification', NotificationSchema);
