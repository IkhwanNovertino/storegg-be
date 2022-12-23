const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email harus diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama harus diisi'],
    maxLength: [225, 'panjang nama harus antara 3 - 225 karakter'],
    minLength: [3, 'panjang nama harus antara 3 - 225 karakter'],
  },
  password: {
    type: String,
    require: [true, 'Password harus diisi'],
    maxLength: [225, 'panjang password harus antara 8 - 225 karakter'],
    minLength: [8, 'panjang password harus antara 8 - 225 karakter'],
  },
  username: {
    type: String,
    require: [true, 'Nama harus diisi'],
    maxLength: [225, 'panjang username harus antara 3 - 225 karakter'],
    minLength: [3, 'panjang username harus antara 3 - 225 karakter'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  avatar: {
    type: String
  },
  fileName: {
    type: String
  },
  phoneNumber: {
    type: Number,
    require: [true, 'Nomor HP harus diisi'],
    maxLength: [13, 'no. Telpon harus antara 9 - 13 karakter'],
    minLength: [9, 'no. Telpon harus antara 9 - 13 karakter'],
  },
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, { timestamps: true }) // untuk menambahkan createdAt dan updateAt di document(table)

//untuk menvalidasi apakah ada email yg sama
playerSchema.path('email').validate(async function (value) {
  try {
    const count = await this.model('Player').countDocuments({ email: value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `${attr.value} sudah terdaftar`)

//untuk membuat passwordnya di hash
playerSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
})

module.exports = mongoose.model('Player', playerSchema);