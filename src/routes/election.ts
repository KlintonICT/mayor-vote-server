import express from 'express';
import { status, toggle, result } from '../controller/election';

const router = express.Router();

// GET election status
router.get('/status', status);

// POST election toggle
router.post('/toggle', toggle);

// GET Election Result
router.get('/result', result);

export default router;
