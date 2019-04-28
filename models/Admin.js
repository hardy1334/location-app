const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Create Schema for admin

const AdminSchema = new Schema ({
  hostel: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  land1: {
    type: String,
    required: true,
  },
  land2: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model ('admins', AdminSchema);
