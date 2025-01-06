import { Router } from "express";
import { addLetter, getLetters } from "../firebase/firebaseLetter";

const router = Router();

// 편지 등록 엔드 포인트
router.post("/timecapsule/letter/:userId", async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;

  try {
    const letterId = await addLetter(userId, content);
    res.status(201).send(`편지가 등록되었습니다. ID: ${letterId}`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// 편지 조회 엔드 포인트
router.get("/timecapsule/letter/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const letters = await getLetters(userId);
    res.status(200).json(letters);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
