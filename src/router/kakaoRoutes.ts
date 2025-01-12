import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";

import { setUsers } from "../firebase/user";

export const kakaoRouter = Router();

dotenv.config();

const kakao = {
  CLIENT_ID: process.env.KAKAO_ID,
  REDIRECT_URI: process.env.REDIRECT_URI,
};

/* login 이후 나타나는 callback page */
kakaoRouter.get(
  "/oauth/callback/kakao",
  async (req: Request, res: Response) => {
    /* access token 발급 */
    let token: any;
    try {
      token = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          grant_type: "authorization_code",
          client_id: kakao.CLIENT_ID,
          redirect_uri: kakao.REDIRECT_URI,
          code: req.query.code as string,
        }),
      });
    } catch (error: any) {
      console.error("토근을 불러올 수 없습니다.", error);
      return res.status(400).json({ error: "토큰 발급 실패" });
    }

    /* access token 발급받은 뒤 사용자 정보 가져옴 */
    let user: any;
    try {
      user = await axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      });
    } catch (error: any) {
      console.error("유저 데이터를 불러올 수 없습니다.", error);
      return res.status(400).json({ error: "사용자 정보 조회 실패" });
    }

    /* 가지고 온 사용자 정보 DB & session 저장 */
    await setUsers(user.data);

    req.session.userData = {
      _id: user.data.id,
      name: user.data.kakao_account.profile.nickname,
      profileImage: user.data.kakao_account.profile.profile_image_url,
      accessToken: token.data.access_token,
    };

    await req.session.save(); // 세션 저장
    res.redirect(`http://localhost:3000/main`);
  },
);

/* session에 저장된 사용자 정보 Client 전달 */
kakaoRouter.get("/api/user", async (req: Request, res: Response) => {
  try {
    const userData = req.session.userData;
    res.status(200).json(userData);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "사용자 조회 실패" });
  }
});

/* 카카오 로그아웃 API */
kakaoRouter.post("/api/logout", async (req: any, res: any) => {
  const accessToken = req.session.userData?.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "로그인 상태가 아닙니다." });
  }

  try {
    await axios({
      method: "POST",
      url: "https://kapi.kakao.com/v1/user/logout",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    delete req.session.userData;
    await req.session.save();

    res.status(200).json({ message: "로그아웃 성공" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: "로그아웃 실패" });
  }
});
