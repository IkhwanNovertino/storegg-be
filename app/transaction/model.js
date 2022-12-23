const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema({
  historyVoucherTopup: {
    gameName: { type: String, require: [true, "nama game harus diisi."] },
    category: { type: String, require: [true, 'kategori harus diisi.'] },
    thumbnail: { type: String },
    coinName: { type: String, require: [true, 'nama koin harus diisi.'] },
    coinQuantity: { type: String, require: [true, 'jumlah koin harus diisi.'] },
    price: { type: Number },
  },

  historyPayment: {
    name: { type: String, require: [true, "nama harus diisi."] },
    type: { type: String, require: [true, "tipe pembayaran harus diisi."] },
    bankName: { type: String, require: [true, 'Bank harus diisi'] },
    noRekening: { type: String, require: [true, 'Nomor Rekening harus diisi'] }
  },

  name: {
    type: String,
    require: [true, 'Nama harus diisi'],
    maxLength: [225, 'pangjang nama harus antara 3 - 225 karakter'],
    minLength: [3, 'pangjang nama harus antara 3 - 225 karakter'],
  },

  accountUser: {
    type: String,
    require: [true, 'Nama akun harus diisi'],
    maxLength: [225, 'pangjang nama harus antara 3 - 225 karakter'],
    minLength: [3, 'pangjang nama harus antara 3 - 225 karakter'],
  },

  tax: {
    type: Number,
    default: 0
  },

  value: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },

  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },

  historyuser: {
    name: { type: String, require: [true, 'nama player harus diisi'] },
    phoneNumber: {
      type: Number,
      require: [true, 'nomor telpon harus diisi'],
      maxLength: [13, 'panjang nomor telpon harus antara 9 - 13 angka'],
      minLength: [9, 'panjang nomor telpon harus antara 9 - 13 angka'],
    }
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema);