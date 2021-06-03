import { createLogger, format, transports } from 'winston';

export default createLogger({
  transports: [
    new transports.Console({
      level: 'info',
    }),
  ],
  format: format.combine(format.printf((info) => `${info.level}:\n${info.message}`)),
});
