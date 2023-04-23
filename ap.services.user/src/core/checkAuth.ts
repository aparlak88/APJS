import jwt from "jsonwebtoken";
var config = require("../config.json");

export default (req: any, res: any, next: any) => {
  try {
    /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.jwtSecretKey);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Authn failed.",
    });
  }
};
