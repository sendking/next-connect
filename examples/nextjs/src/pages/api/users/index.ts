import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getUsers, randomId, saveUsers } from "../../../utils/api";
import type { User } from "../../../utils/common";
import { validateUser } from "../../../utils/common";
import cors from 'cors'
const router = createRouter<NextApiRequest, NextApiResponse>();

// step1:
// if i use cors middleware, then i can't catch error, and the request is in pending

// router.use(cors())

// step2:
// copy `await fetch("/api/users").then((res) => res.json());` in chrome console


router.get(async (req, res, next) => {
  const users = await getUsers(req);
  res.json({
    users,
  });
})

router.post((req, res) => {
  const users = getUsers(req);
  const newUser = {
    id: randomId(),
    ...req.body,
  } as User;
  validateUser(newUser);
  users.push(newUser);
  saveUsers(res, users);
  res.json({
    message: "User has been created",
  });
});

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
