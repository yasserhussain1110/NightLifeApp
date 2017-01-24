const express = require ('express');
const app = express();

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
  require('./tools/DevSetup').setupDev(app);
}

app.listen(process.env.PORT);


