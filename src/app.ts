require('dotenv-safe').config();

import http from 'http';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';

import CandidateData from './data/candidates.json';
import CandidateModel from './models/candidate';
import ElectionStatusModel from './models/electionStatus';

import CandidateRouter from './routes/candidate';
import ElectionRouter from './routes/election';
import VoterRouter from './routes/voter';

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost/mayor-vote', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(async () => {
    const candidates = (await CandidateModel.find()) || [];
    const electionStatus = (await ElectionStatusModel.find()) || [];

    if (candidates.length === 0) {
      await CandidateModel.insertMany(CandidateData);
    }
    if (electionStatus.length === 0) {
      await ElectionStatusModel.create({ enable: false });
    }
  });

const app = express();
const db = mongoose.connection;
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/candidates', CandidateRouter);
app.use('/api/election', ElectionRouter);
app.use('/api/vote', VoterRouter);

db.on('error', console.error.bind(console, 'db connection error: '));
db.on('open', () => {
  server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
  });
});

const voteIO = io.of('/vote');

voteIO.on('connection', (socket: any) => {
  socket.on('post-vote', async (candidateId: string) => {
    const candidate = await CandidateModel.findOne({ id: candidateId });
    socket.emit('new-vote', candidate);
  });
});
