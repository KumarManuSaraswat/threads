import express from 'express';
import { signupUser } from '../controllers/auth.controller.js';

const router = express.Router();
// When someone sends a POST request to /signup, run the signupUser function
router.post('/signup',signupUser);
export default router;