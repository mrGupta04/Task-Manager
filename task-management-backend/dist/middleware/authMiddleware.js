"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    // Check if token exists
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        // Verify the token
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
