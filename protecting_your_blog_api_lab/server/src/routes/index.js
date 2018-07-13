import { Router } from 'express';
import blogsRouter from './blogs';
import authRouter from './auth';
import {isLoggedIn, tokenMiddleware} from '../middleware/auth.mw';

let router = Router();
console.log('I am in router index.js');
router.use('/auth', authRouter);
// router.use(tokenMiddleware);
// router.use(isLoggedIn);
router.use('/blogs', blogsRouter);

export default router;