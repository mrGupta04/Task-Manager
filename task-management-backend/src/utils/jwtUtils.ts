import jwt from 'jsonwebtoken';
import { DecodedToken } from '../types/custom';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: DecodedToken): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): DecodedToken => {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
};