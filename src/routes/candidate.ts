import express from 'express';
import { list } from '../controller/candidate';

const router = express.Router();

// GET Candidates
router.get('/', list);

export default router;
