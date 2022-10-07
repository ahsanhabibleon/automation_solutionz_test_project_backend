"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || 'somethingsecret', {
        expiresIn: '30d',
    });
};
exports.generateToken = generateToken;
const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jsonwebtoken_1.default.verify(token, 
        // @ts-ignore
        process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ messege: 'Invalid Token' });
            }
            else {
                req.user = decode;
                next();
            }
        });
    }
    else {
        res.status(401).send({ messege: 'No Token' });
    }
};
exports.isAuth = isAuth;
