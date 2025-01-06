import { Router } from "express";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/firebaseConfig";

export const userRouter = Router();

userRouter.get("/api/user/:id", async (req: any, res: any) => {
  const userId = req.params.id;

  try {
    const userRef = doc(database, "timecapsule", "user", "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const userData = userDoc.data();
    res.status(200).json(userData);
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ message: "사용자 조회 중 오류가 발생했습니다." });
  }
});
