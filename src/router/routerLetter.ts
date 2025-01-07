import { Router } from "express";
import { addLetter, getLetters } from "../firebase/firebaseLetter";

const router = Router();

// 편지 등록 엔드 포인트
router.post("/timecapsule/letter", async (req, res) => {
  const userId = req.session.userData?._id;
  const { content } = req.body;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const letterId = await addLetter(userId, content);
    res.status(201).send(`편지가 등록되었습니다. ID: ${letterId}`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// 편지 조회 엔드 포인트
router.get("/timecapsule/letter", async (req, res) => {
  const userId = req.session.userData?._id;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const letters = await getLetters(userId);
    res.status(200).json(letters);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
