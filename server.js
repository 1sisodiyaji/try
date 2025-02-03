const express = require('express'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/ConnectDB');
const UserRoutes =require('./routes/user.routes');

dotenv.config();  

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
 
connectDB;

app.use('/api/auth', UserRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Express MySQL API');
});
  
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 