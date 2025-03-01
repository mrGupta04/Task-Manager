import { Request } from 'express';

export interface DecodedToken {
    userId: number;
    // Add other properties if your token contains more data
}

declare module 'express' {
    interface Request {
        user?: DecodedToken;
    }
}