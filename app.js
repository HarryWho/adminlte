require('dotenv').config({ path: './config/config.env' });
const { ConnectDB } = require('./config/DB')
const express = require('express')


const app = express()



// connect to MongoDB
ConnectDB();
// start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})