import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userData: { _id: number; name: string };
  }
}

export const sessionConfig = session({
  secret: "ras",
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: "strict", // 엄격한 SameSite 설정
    // maxAge: 1000 * 60 * 60 * 24, // 1일 (밀리초 단위)
  },
});
