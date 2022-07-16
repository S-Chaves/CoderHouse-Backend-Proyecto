import passport from 'passport';
import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = new Router();

class RouterAuth {
  constructor() {
    this.controlador = new AuthController();
  }

  start() {
    // Facebook Auth
    router.get('/auth/facebook',
      passport.authenticate('facebook', { scope: 'email' }));

    router.get('/auth/facebook/callback',
      passport.authenticate('facebook',
        { failureRedirect: '/auth/error?error=SIGNUP', successRedirect: '/' }));

    // Local Auth
    router.post('/auth/login', passport.authenticate('login', {
      failureRedirect: '/auth/error?error=LOGIN'
    }), this.controlador.postAuthLogin);

    router.post('/auth/signup', passport.authenticate('signup', {
      failureRedirect: '/auth/error?error=SIGNUP'
    }), this.controlador.postAuthSignup);

    router.get('/auth/error', this.controlador.getAuthError);

    // Vistas
    router.get('/login', this.controlador.getLogin);
    router.get('/logout', this.controlador.getLogout);

    return router;
  }
}

export default RouterAuth;