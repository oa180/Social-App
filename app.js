const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
// Third-Party Middlewares
const app = express();
dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'develpoment') app.use(morgan('dev'));

app.use(helmet());

// Body Parser
app.use(express.json({ limit: '10kb' }));

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, 'first.jpg');
  },
});

const upload = multer({
  storage: multerStorage,
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('file uploaded successfully!');
});
// Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
module.exports = app;
