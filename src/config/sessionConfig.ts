import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userData: { _id: number; name: string; profileImage: string };
  }
}

export const sessionConfig = session({
  secret: "ras",
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,
  },
});
