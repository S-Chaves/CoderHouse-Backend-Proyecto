import { Router } from 'express';
import IndexController from '../controllers/index.controller.js';

const router = new Router();

class RouterIndex {
  constructor() {
    this.controlador = new IndexController();
  }

  start() {
    router.get('/', this.controlador.getIndex);
    // Rutas no implementadas
    router.get('*', this.controlador.noImplementada);

    return router;
  }
}

export default RouterIndex;