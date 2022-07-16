import { logRuta, warnLogger } from "../utils/logger.js";

class IndexController {
  getIndex = async (req, res) => {
    logRuta(req);
    req.session.user = req.user;
    const user = req.session.user;
    
    res.render('index', { user });
  };

  noImplementada = (req, res) => {
    logRuta(req);
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;

    warnLogger.warn('Ruta %s %s no implementada', req.method, url);
    res.send(`Ruta ${req.method} ${url} no implementada`);
  };
}

export default IndexController;