import { fork } from 'child_process';
import { logRuta } from '../utils/logger.js';
import { numCPU } from '../../server.js';

class ProcessController {
  getInfo = (req, res) => {
    logRuta(req);
    const info = {
      "Argumentos de entrada": process.argv.slice(2),
      "Sistema operativo": process.platform,
      "Versión de node.js": process.version,
      "Memoria total reservada": process.memoryUsage().rss,
      "Path de ejecución": process.execPath,
      "Process id": process.pid,
      "Carpeta del proyecto": process.cwd(),
      "Cantidad de procesadores": numCPU
    };
    res.json(info);
  };

  getRandoms = (req, res) => {
    logRuta(req);
    let cant = 1000;
    if (!isNaN(parseInt(req.query.cant))) cant = req.query.cant;
    const forked = fork('./src/utils/randoms.js');

    forked.on('message', msg => {
      msg == 'listo'
        ? forked.send({ cant })
        : res.json(msg.numeros);
    });
  };
}

export default ProcessController;