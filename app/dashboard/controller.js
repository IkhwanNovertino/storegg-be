const Transaction = require('../transaction/model');
const Voucher = require('../voucher/model');
const Player = require('../player/model');
const Category = require('../category/model');

module.exports = {
  index: async (req, res) => {
    try {

      let transaction = await Transaction.countDocuments();
      let voucher = await Voucher.countDocuments();
      let player = await Player.countDocuments();
      let category = await Category.countDocuments();
      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'Halaman Dashboard',
        count: {
          transaction,
          voucher,
          player,
          category
        }
      })
    } catch (err) {
      console.log(err);
    }
  }
}