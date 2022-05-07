require('dotenv-safe').config();

import http from 'http';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';

import CandidateData from './data/candidates.json';
import CandidateModel from './models/candidate';

import CandidateRouter from './routes/candidate';

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost/mayor-vote', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(async () => {
    const candidates = (await CandidateModel.find()) || [];

    if (candidates.length === 0) {
      await CandidateModel.insertMany(CandidateData);
    }
  });

const app = express();
const db = mongoose.connection;
const server = http.createServer(app);

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/candidates', CandidateRouter);

db.on('error', console.error.bind(console, 'db connection error: '));
db.on('open', () => {
  server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
  });
});
