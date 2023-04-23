import jwt from "jsonwebtoken";
import { UserUtil } from "./userUtil";
import { DataRepository } from "../data/dataRepository";
import { User } from "../model/user";
const dataRepository = new DataRepository();
const userUtil = new UserUtil(dataRepository);

var config = require("../config.json");

export default async (req: any, res: any, next: any) => {
  try {
    /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.jwtSecretKey);
    req.userData = decodedToken;
    let user: User | null = await userUtil.getUser(req.userData.userid);
    if (user != null) {
      switch (req.url) {
        case "/getUsers":
          switch (user.role) {
            case "System Administrator":
              next();
              break;
            default:
              return res.status(401).send({
                message: "Authz failed.",
              });
          }
          break;
      }
    } else {
      return res.status(401).send({
        message: "Authz failed.",
      });
    }
  } catch (error) {
    return res.status(401).send({
      message: "Authz failed.",
    });
  }
};
