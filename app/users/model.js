const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email harus diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama harus diisi']
  },
  password: {
    type: String,
    require: [true, 'Password harus diisi']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  phoneNumber: {
    type: Number,
    require: [true, 'Nomor HP harus diisi']
  }

}, { timestamps: true }) // untuk menambahkan createdAt dan updateAt di document(table)

module.exports = mongoose.model('User', userSchema);