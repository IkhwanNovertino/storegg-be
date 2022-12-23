const Payment = require('./model');
const Bank = require('../bank/model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const payment = await Payment.find().populate('banks');

      res.render('admin/payment/view_payment', {
        name: req.session.user.name,
        title: 'Halaman Payment',
        payment,
        alert
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();

      res.render('admin/payment/create', {
        name: req.session.user.name,
        title: 'Halaman Tambah Payment',
        bank,
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { type, banks, status } = req.body;

      let payment = await Payment({ type, banks, status });
      await payment.save();

      req.flash('alertMessage', 'Berhasil menambahkan paymnet');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id);
      const bank = await Bank.find();

      res.render('admin/payment/edit', {
        name: req.session.user.name,
        title: 'Halaman Ubah Payment',
        payment,
        bank
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionEdit: async (req, res) => {
    try {
      req.flash('alertMessage', 'Berhasil mengubah payment');
      req.flash('alertStatus', 'success');

      const { id } = req.params;
      const { type, banks } = req.body;

      await Payment.findOneAndUpdate(
        { _id: id },
        { type, banks }
      );

      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionDelete: async (req, res) => {
    try {
      req.flash('alertMessage', 'Berhasil hapus payment');
      req.flash('alertStatus', 'success');

      const { id } = req.params;

      await Payment.deleteOne({ _id: id });

      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;

      let payment = await Payment.findOne({ _id: id })

      let newStatus = payment.status === 'Y' ? 'N' : 'Y';

      payment = await Payment.findOneAndUpdate({ _id: id }, { status: newStatus })

      req.flash('alertMessage', 'Berhasil mengubah status payment');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  }
}