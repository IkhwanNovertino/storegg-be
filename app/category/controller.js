const Category = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const category = await Category.find();

      res.render('admin/category/view_category', {
        name: req.session.user.name,
        title: 'Halaman Kategori',
        category,
        alert
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create', {
        name: req.session.user.name,
        title: 'Halaman Tambah Kategori',
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionCreate: async (req, res) => {
    try {

      req.flash('alertMessage', 'Berhasil tambah kategori');
      req.flash('alertStatus', 'success');

      const { name } = req.body;

      let category = await Category({ name });
      await category.save();

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      res.render('admin/category/edit', {
        name: req.session.user.name,
        title: 'Halaman Ubah Kategori',
        category
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionEdit: async (req, res) => {
    try {
      req.flash('alertMessage', 'Berhasil ubah kategori');
      req.flash('alertStatus', 'success');

      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findOneAndUpdate(
        { _id: id },
        { name }
      );

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionDelete: async (req, res) => {
    try {
      req.flash('alertMessage', 'Berhasil hapus kategori');
      req.flash('alertStatus', 'success');

      const { id } = req.params;

      const category = await Category.deleteOne({ _id: id });

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  }
}