import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../firebase/firebaseTodo";

const router = Router();

router.post("/todo/task", async (req, res) => {
  const userId = req.session.userData?._id; // 세션에서 사용자 ID 가져옴
  const { task, categoryId, selectedDate } = req.body;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const todoId = await addTodo(userId, task, categoryId, selectedDate);
    res.status(201).send(`할 일이 등록되었습니다. ID: ${todoId}`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get("/todo/task", async (req, res) => {
  const userId = req.session.userData?._id;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    const todos = await getTodo(userId); // 세션 ID를 사용
    res.status(200).json(todos);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch("/todo/task/:todoId", async (req, res) => {
  const userId = req.session.userData?._id;
  const { todoId } = req.params;
  const { isCompleted } = req.body;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    await updateTodo(userId, todoId, isCompleted);
    res.status(200).send("할 일이 수정되었습니다.");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/todo/task/:todoId", async (req, res) => {
  const userId = req.session.userData?._id;
  const { todoId } = req.params;

  if (!userId) {
    res.status(401).send("로그인이 필요합니다.");
    return;
  }

  try {
    await deleteTodo(userId, todoId);
    res.status(200).send("할 일이 삭제되었습니다.");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
