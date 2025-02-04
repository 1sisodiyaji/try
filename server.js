const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require('./config/ConnectDB');
const cluster = require('cluster');
const os = require('os');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');   
const logger = require('./config/logger');
const UserRoutes = require('./routes/user.routes');
const OrderRoute = require('./routes/order.routes');
const AIRoutes = require('./routes/ai.routes');

connectDB;

if (!cluster.isMaster) {
  const numCPUs = os.cpus().length; 

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} 
else {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
  });
  const app = express();
  const PORT = process.env.PORT || 5057;
  app.use(limiter);
  app.use(helmet()); 
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
  app.use(cors({
    origin: function (origin, callback) { 
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "access_token"],
  }));

 
 
  app.use('/api/auth', UserRoutes);
  app.use('/api/order', OrderRoute);
  app.use('/api/ai', AIRoutes);

  app.get('/', (req, res) => {  res.send('Welcome to the Node.js Express MySQL API'); });

  app.listen(PORT, () => {  logger.info(`Server is running on port ${PORT} (Worker ${process.pid})`);  });

  process.on('uncaughtException', (err) => {  logger.error(`Uncaught exception: ${err.message}`); });
  
  process.on('unhandledRejection', (reason, promise) => {   logger.error(`Unhandled rejection: ${reason}`);  });
}
