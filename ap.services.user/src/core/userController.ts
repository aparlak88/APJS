import { Request, Response } from "express";
import { UserUtil } from "./userUtil";
import { DataRepository } from "../data/dataRepository";
import { User } from "../model/user";

const express = require("express");
const router = express.Router();

const dataRepository = new DataRepository();
const userUtil = new UserUtil(dataRepository);

router.get("/", (req: Request, res: Response): void => {
  res.send("Successfully started!");
});

router.post("/addUser", (req: Request, res: Response): void => {
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

router.post("/changePassword", (req: Request, res: Response): void => {
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
});

router.get("/changeUserState", (req: Request, res: Response): void => {
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
});

router.get("/getUser", (req: Request, res: Response): void => {
  if (isNaN(req.query.id as any)) {
    res.status(400);
    res.send("Invalid paramters");
  }
  try {
    let result: User | null = userUtil.getUser(req.query.id as any);
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
  let user = userUtil.getUser(req.query.id as any);
  if (user) {
    res.status(200);
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.get("/getUsers", (req: Request, res: Response): void => {
  try {
    let users = userUtil.getUsers();
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
});

router.get("/login", (req: Request, res: Response): void => {
  if (!req.body.userName?.length || !req.body.password?.length) {
    res.status(400);
    res.send("Invalid paramters");
  }
  try {
    let result = userUtil.login(req.body.userName, req.body.password);
    if (result) {
      res.status(200);
      res.send("Success");
    } else {
      res.sendStatus(406);
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/updateUser", (req: Request, res: Response): void => {
  if (!req.body.user) {
    res.status(400);
    res.send("Invalid paramters");
  }
  try {
    let user = req.body.user;
    let updatedUser = userUtil.updateUser(user);
    res.status(200);
    res.send(updatedUser);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
