import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import hello from './routes';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/v1', hello);

const port = 5500;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
