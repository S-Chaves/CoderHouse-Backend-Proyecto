import { logRuta } from '../utils/logger.js';
import CarritosDaoMongo from '../daos/CarritosDaoMongo.js';

const carritosApi = CarritosDaoMongo.getInstance();

class AuthController {
  postAuthLogin = (req, res) => {
    res.redirect('/');
  };

  postAuthSignup = async (req, res) => {
    const { email, direccion } = req.user;

    const carrito = { email, direccion };
    await carritosApi.save(carrito);
    res.redirect('/');
  };

  getAuthError = (req, res) => {
    logRuta(req);
    const error = req.query.error;
    res.render('layouts/error', { error });
  };

  getLogin = (req, res) => {
    logRuta(req);
    res.render('login');
  };

  getLogout = (req, res) => {
    const user = req.session.user;
    logRuta(req);

    if (!user) res.end();

    req.session.destroy(err => {
      if (err) return res.json({ status: 'Logout ERROR', body: err });
      res.render('layouts/logout', { user });
    });
  };
}

export default AuthController;