import express from 'express';
import { status, post } from '../controller/vote';

const router = express.Router();

// POST Vote
router.post('/', post);

// POST Check Vote status
router.post('/status', status);

export default router;
