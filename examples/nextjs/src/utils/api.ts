import cookie from "cookie";
import crypto from "crypto";
import type { IncomingMessage, ServerResponse } from "http";
import type { User } from "./common";
import { COOKIE_NAME } from "./common";

export const randomId = () => crypto.randomUUID();

export const getUsers = async (req: IncomingMessage) => {
  // we store all data in cookies for demo purposes
  const cookies = await a.b
  return cookies;
};

export const saveUsers = (res: ServerResponse, users: User[]) => {
  const setCookie = cookie.serialize(COOKIE_NAME, JSON.stringify(users), {
    path: "/",
  });
  res.setHeader("Set-Cookie", setCookie);
};
