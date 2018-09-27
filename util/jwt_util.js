import jwt from 'jsonwebtoken';

export const decodeToken = token => {
    return new Promise((res, rej) => {
        jwt.verify(token, 'somesecretammulakka', (err, decoded) => {
            if (err || !decoded) {
                rej(new Error('Error while decoding token'));
            }
            console.log('dedoded', decoded);
            res(decoded);
        });
    });
}

export const verifyJWT = async (req, res, next) => {
    let token = req.headers &&  req.headers.token;
    if (!token) {
        res.status(400)
            .json({message: "Invalid auth token provided."})
    }

    let decoded = await decodeToken(token);
    if (decoded instanceof Error || (!decoded)) {
        res.status(400)
            .json({message: "Invalid auth token provided."})
    }

    req.user = decoded.data
    next();
}