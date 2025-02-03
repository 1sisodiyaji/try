const winston = require('winston');
const moment = require('moment-timezone');
 

const logLevels = {
  levels: {
    success: 0, 
    info: 1,
    warn: 2,
    error: 3
  },
  colors: {
    success: 'green', 
    info: 'blue',
    warn: 'yellow',
    error: 'red'
  }
};

winston.addColors(logLevels.colors);
 
const logger = winston.createLogger({
  levels: logLevels.levels,
  level: 'info',  
  format: winston.format.combine(
    winston.format.colorize(), 
    winston.format.timestamp({
      format: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')  
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;  
    })
  ),
  transports: [
    new winston.transports.Console()  
  ],
});
 
module.exports = logger;
