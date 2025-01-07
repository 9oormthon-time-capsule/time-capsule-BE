import { Router } from "express";
import {
  addCategory,
  deleteCategories,
  getCategories,
} from "../firebase/firebaseCategory";

const router = Router();

router.post("/todo/category", async (req, res) => {
  const userId = req.session.userData?._id;
  const { categoryName, textColor } = req.body;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const categoryId = await addCategory(userId, categoryName, textColor);
    res.status(201).json({ message: "카테고리가 추가되었습니다.", categoryId });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get("/todo/category", async (req, res) => {
  const userId = req.session.userData?._id;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const categories = await getCategories(userId);
    res.status(200).json(categories);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    res.status(500).send(error.message);
  }
});

router.delete("/todo/category/:categoryId", async (req, res) => {
  const userId = req.session.userData?._id;
  const { categoryId } = req.params;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  if (!categoryId) {
    res.status(400).send("카테고리 ID가 필요합니다.");
    return;
  }

  try {
    const categories = await deleteCategories(userId, categoryId);
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
