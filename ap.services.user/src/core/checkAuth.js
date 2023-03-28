const jwt = require('jsonwebtoken');
var config = require("../../config.json");

module.exports = (req, res, next) => {
    try {
        /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, config.jwtSecretKey);
        req.userData = decodedToken;
        next();
    }catch(error) {
        return res.status(401).send({
            message: 'Auth failed.'
        });
    }
}