import { Router } from 'express';
import compression from 'compression';
import ProcessController from '../controllers/process.controller.js';

const router = new Router();

class RouterProcess {
  constructor() {
    this.controlador = new ProcessController();
  }

  start() {
    router.get('/info', compression(), this.controlador.getInfo);
    router.get('/api/randoms', this.controlador.getRandoms);
    
    return router;
  }
}

export default RouterProcess;