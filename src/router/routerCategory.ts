import { Router } from "express";
import { addCategory, getCategories } from "../firebase/firebaseCategory";

const router = Router();

router.post("/todo/category/:userId", async (req, res) => {
  const { categoryName, color } = req.body;
  const { userId } = req.params;

  try {
    const categoryId = await addCategory(userId, categoryName, color);
    res.status(201).json({ message: "카테고리가 추가되었습니다.", categoryId });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get("/todo/category/:userId", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
