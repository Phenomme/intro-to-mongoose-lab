const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    text: String,
    age: Number,
  });

  
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer