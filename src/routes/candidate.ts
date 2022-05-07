import express from 'express';
import CandidateController from '../controller/candidate/index';

const router = express.Router();

// GET Candidates
router.get('/', CandidateController.list);

export default router;
