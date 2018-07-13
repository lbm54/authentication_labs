import { Router } from 'express';
import blogsRouter from './blogs';
import authRouter from './auth';
import usersRouter from './users';
import {isLoggedIn, tokenMiddleware} from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);
router.use('/blogs', blogsRouter);
router.use(tokenMiddleware);
router.use(isLoggedIn);
router.use('/users', usersRouter);

export default router;
