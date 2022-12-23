const User = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_signin', {
          title: 'Login',
          alert
        });
      } else {
        res.redirect('/dashboard');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (user) {
        if (user.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            req.session.user = {
              id: user._id,
              name: user.name,
              email: user.email,
              status: user.status
            }
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', `Password anda salah`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');

          }

        } else {
          req.flash('alertMessage', `Status anda belum aktif!`);
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', `Email anda salah!`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },

  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect('/')
  }
}