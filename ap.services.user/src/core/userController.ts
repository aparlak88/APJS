import { Request, Response } from 'express';
import { UserUtil } from './userUtil';
import { DataRepository } from '../data/dataRepository';

const express = require('express');
const router = express.Router();

const dataRepository = new DataRepository();
const userUtil = new UserUtil(dataRepository);

router.get('/', (req: Request, res: Response): void => {
  res.send('Successfully started!');
});

router.post('/addUser', (req: Request, res: Response): void => {
  if (!req.body.user) {
    res.sendStatus(404);
  }

  try {
    let user = req.body.user;
    let addedUser = userUtil.addUser(user);
    res.status(200);
    res.send(addedUser);
  } catch {
    res.sendStatus(500);
  }
});

router.post('/changePassword', (req: Request, res: Response): void => {
  if (isNaN(req.body.id as any)) {
    res.sendStatus(400);
  }

  if (!req.body.oldPassword || !req.body.newPassword) {
    res.sendStatus(400);
  }

  try {
    res.status(200);
    res.send(
      userUtil.changePassword(
        req.body.id,
        req.body.oldPassword,
        req.body.newPassword
      )
    );
  } catch {
    res.sendStatus(500);
  }
});

router.get('/changeUserState', (req: Request, res: Response): void => {
  if (isNaN(req.query.id as any)) {
    res.sendStatus(400);
  }

  try {
    res.status(200);
    res.send(userUtil.changeUserState(req.query.id as any));
  } catch {
    res.sendStatus(500);
  }
});

router.get('/getUser', (req: Request, res: Response): void => {
  if (isNaN(req.query.id as any)) {
    res.sendStatus(400);
  }
  let user = userUtil.getUser(req.query.id as any);
  if (user) {
    res.status(200);
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.get('/getUsers', (req: Request, res: Response): void => {
  let users = userUtil.getUsers();

  if (users?.length) {
    res.status(200);
    res.send(users);
  } else {
    res.sendStatus(404);
  }
});

router.post('/updateUser', (req: Request, res: Response): void => {
  if (!req.body.user) {
    res.sendStatus(404);
  }
  try {
    let user = req.body.user;
    let updatedUser = userUtil.updateUser(user);
    res.status(200);
    res.send(updatedUser);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;
