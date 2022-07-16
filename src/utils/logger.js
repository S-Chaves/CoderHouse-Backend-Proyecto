import pino from 'pino';

function buildInfoLogger() {
  const infoLogger = pino();
  infoLogger.level = 'info';
  return infoLogger;
}

function buildWarnLogger() {
  const warnLogger = pino('logs/warn.log');
  warnLogger.level = 'warn';
  return warnLogger;
}

function buildErrorLogger() {
  const errorLogger = pino('logs/error.log');
  errorLogger.level = 'error';
  return errorLogger;
}

const infoLogger = buildInfoLogger();
const warnLogger = buildWarnLogger();
const errorLogger = buildErrorLogger();

const logRuta = (req) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  infoLogger.info('Ruta: %s Metodo: %s', url, req.method);
};

const logError = (error) => {
  infoLogger.error('%s', error);
  errorLogger.error('%s', error);
};

export { warnLogger, logError, logRuta };