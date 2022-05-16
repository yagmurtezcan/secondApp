import { v4 as uuid } from "uuid";

import { Request, Response } from "express";

const users: object[] = [];

export const getUser = (req: Request, res: Response) => {
  res.send(users);
};

export const createUser = (req: Request, res: Response) => {
  const user = req.body;
  const userId = uuid();
  const userWithId = { ...user, userId: userId };
  users.push(userWithId);
  res.send(users);
};
