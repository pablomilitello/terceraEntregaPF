import winston from 'winston';

const customLevel = {
  names: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'cyan',
  },
};

export const logger = winston.createLogger({
  levels: customLevel.names,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(winston.format.colorize({ colors: customLevel.colors }), winston.format.simple()),
    }),
    new winston.transports.File({
      level: 'error',
      filename: './errors.log',
      format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    }),
  ],
});
