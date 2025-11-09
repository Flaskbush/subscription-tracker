import { Router } from 'express';
import authorizeMiddleware from '../middlewares/auth.middleware.js';
import { getAllUsers, getUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getAllUsers)

userRouter.get('/:id', authorizeMiddleware, getUser)

userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send({ title: 'UDPATE user'}));

userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE user'}));



export default userRouter;