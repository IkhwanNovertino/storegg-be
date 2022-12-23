const Nominal = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      
      const nominal = await Nominal.find();
      
      res.render('admin/nominal/view_nominal', {
        name: req.session.user.name,
        title: 'Halaman Nominal',
        nominal,
        alert
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/nominal/create', {
        name: req.session.user.name,
        title: 'Halaman Tambah Nominal',
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionCreate: async (req, res) => {
    try {

      req.flash('alertMessage', 'Berhasil menambahkan koin');
      req.flash('alertStatus', 'success');

      const { coinQuantity, coinName, price } = req.body;

      let nominal = await Nominal({ coinQuantity, coinName, price });
      await nominal.save();

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findById(id);

      res.render('admin/nominal/edit', {
        name: req.session.user.name,
        title: 'Halaman Ubah Nominal',
        nominal
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionEdit: async (req, res) => {
    try {
      req.flash('alertMessage', 'Berhasil mengubah koin');
      req.flash('alertStatus', 'success');

      const { id } = req.params;
      const { coinQuantity, coinName, price } = req.body;

      await Nominal.findOneAndUpdate(
        { _id: id },
        {coinQuantity, coinName, price}
      );

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionDelete: async (req, res) => {
    try {
      req.flash('alertMessage', 'Berhasil hapus koin');
      req.flash('alertStatus', 'success');

      const { id } = req.params;

      await Nominal.deleteOne({ _id: id });

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  }
}