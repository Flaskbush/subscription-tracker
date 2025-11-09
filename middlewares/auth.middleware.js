import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';


const authorizeMiddleware = async (req, res, next) => {
    try {
        let token;
        // Check for token in Authorization header
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // if no token found, throw error
        if(!token) {
            const error = new Error('No token provided, authorization denied');
            error.statusCode = 401;
            throw error;
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId)

        if(!user) {
            const error = new Error('User not found, authorization denied');
            error.statusCode = 401;
            throw error;
        }

        // Attach user to request object
        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

export default authorizeMiddleware;