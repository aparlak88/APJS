import { NextFunction, Request, Response } from "express";
import { UserUtil } from "./userUtil";
import { DataRepository } from "../data/dataRepository";
import { User } from "../model/user";
import express from "express";

import checkAuth from "./checkAuth";
import checkRole from "./checkRole";
const router = express.Router();
const dataRepository = new DataRepository();
const userUtil = new UserUtil(dataRepository);

router.get("/", (req: Request, res: Response): void => {
  res.send("Successfully started!");
});

router.post("/addUser", checkAuth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await checkRole(req, res);
  if (!req.body.user) {
    res.status(400);
    res.send("Invalid paramters");
  }
  try {
    let user = req.body.user;
    let addedUser = userUtil.addUser(user);
    res.status(200);
    res.send(addedUser);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post(
  "/changePassword",
  checkAuth,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await checkRole(req, res);
    if (isNaN(req.body.id as any)) {
      res.status(400);
      res.send("Invalid paramters");
    }
    if (!req.body.oldPassword?.length || !req.body.newPassword?.length) {
      res.status(400);
      res.send("Invalid paramters");
    }
    try {
      userUtil.changePassword(
        req.body.id,
        req.body.oldPassword,
        req.body.newPassword
      );
      res.status(200);
      res.send("Success");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
);

router.get(
  "/changeUserState",
  checkAuth,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await checkRole(req, res);
    if (isNaN(req.query.id as any)) {
      res.status(400);
      res.send("Invalid paramters");
    }
    try {
      userUtil.changeUserState(req.query.id as any);
      res.status(200);
      res.send("Success");
    } catch {
      res.sendStatus(500);
    }
  }
);

router.get(
  "/getUser",
  checkAuth,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await checkRole(req, res);
    if (isNaN(req.query.id as any)) {
      res.status(400);
      res.send("Invalid paramters");
    }
    try {
      let result: User | null = await userUtil.getUser(req.query.id as any);
      if (result === null) {
        res.status(406);
        res.send("No result found");
      } else {
        res.status(200);
        res.send(result);
      }
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
);

router.get(
  "/getUsers",
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    await checkRole(req, res);
    try {
      let users = await userUtil.getUsers();
      if (users?.length) {
        res.status(200);
        res.send(users);
      } else {
        res.status(406);
        res.send("No result found");
      }
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    if (!req.body.userName || !req.body.password) {
      res.status(400);
      res.send("Invalid paramters");
    }
    try {
      let token = await userUtil.login(req.body.userName, req.body.password);
      res.status(200);
      res.send(token);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
);

router.post(
  "/updateUser",
  checkAuth,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await checkRole(req, res);
    if (!req.body.user) {
      res.status(400);
      res.send("Invalid paramters");
    }
    try {
      let user = req.body.user;
      let updatedUser = await userUtil.updateUser(user);
      res.status(200);
      res.send(updatedUser);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
);

module.exports = router;
