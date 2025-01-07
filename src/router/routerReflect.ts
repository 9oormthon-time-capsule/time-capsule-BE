import { Router } from "express";
import { addReflect, getReflect } from "../firebase/firebaseReflect";

const router = Router();

// 회고 등록 엔드포인트
router.post("/timecapsule/reflect", async (req, res) => {
  const userId = req.session.userData?._id; // 세션에서 사용자 ID 가져옴
  const { content } = req.body;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const reflectId = await addReflect(userId, content);
    res.status(201).send(`회고가 등록되었습니다. ID: ${reflectId}`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// 회고 조회 엔드포인트
router.get("/timecapsule/reflect", async (req, res) => {
  const userId = req.session.userData?._id;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const reflects = await getReflect(userId); // 세션 ID를 사용
    res.status(200).json(reflects);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
