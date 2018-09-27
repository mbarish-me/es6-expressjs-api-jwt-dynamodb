import jwt from 'jsonwebtoken';

export const verifyJWT = async (req, res, next) => {
    let token = req.headers &&  req.headers.token;
    if (!token) {
        res.status(400)
            .json({message: "Invalid auth token provided."})
    }

    jwt.verify(token, 'somesecretammulakka', (err, decoded) => {
        if (err || (!decoded)) {
            res.status(400)
                .json({message: "Invalid auth token provided."})
        }
        next();
    });
}