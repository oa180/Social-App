const mongoose = require('mongoose');
const app = require('./app');
// Connect Database
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connetion Successful!'));

// Creating Server
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server is Running on Port ${port} ...`);
});
