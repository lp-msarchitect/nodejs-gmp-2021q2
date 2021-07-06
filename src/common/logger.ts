import { createLogger, format, transports, addColors } from 'winston';

addColors({
  error: 'red',
});

export default createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
});
