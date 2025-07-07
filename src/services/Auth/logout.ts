// pages/api/auth/logout.ts
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", cookie.serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,   // expira imediatamente
  }));
  res.status(200).json({ ok: true });
}
