require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const cors = require('./middleware/cors');
const fileUpload = require('express-fileupload');
const path = require('path')

// Models
const user = require('./models/User');

// Routes
const router = require('./routes/index');
const authRouter = require('./routes/authRouter');

// Error Handler
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 8080;

console.log('Port ', PORT);

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use('/auth', authRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate().then(() => {
      console.log("CONNECTED!");
    })
      .catch((err) => {
        console.log("SOMETHING DONE GOOFED");
      });
    await sequelize.sync().then(() => {
      console.log("CONNECTED!");
    })
      .catch((err) => {
        console.log("SOMETHING DONE GOOFED");
      });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}


start();