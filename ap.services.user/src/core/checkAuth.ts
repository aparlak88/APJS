import jwt from 'jsonwebtoken';

module.exports = (req: any, res: any, next: any) => {
    try {
        /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret_key');
        req.userData = decodedToken;
        next();
    }catch(error) {
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}