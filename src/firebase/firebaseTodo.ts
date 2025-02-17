import { database } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Todo 등록 함수
export const addTodo = async (
  userId: number,
  task: string,
  categoryId: string,
  selectedDate: string
) => {
  try {
    const docRef = await addDoc(
      collection(doc(database, "todos", userId.toString()), "posts"),
      {
        task,
        categoryId,
        isCompleted: false,
        selectedDate,
        createdAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    throw new Error(`할 일 등록 중 오류 발생: ${error}`);
  }
};

// todo 조회 함수
export const getTodo = async (userId: number) => {
  try {
    const querySnapshot = await getDocs(
      collection(doc(database, "todos", userId.toString()), "posts")
    );
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return todos;
  } catch (error) {
    throw new Error(`할 일 조회 중 오류 발생: ${error}`);
  }
};

// todo update 함수
export const updateTodo = async (
  userId: number,
  todoId: string,
  isCompleted: boolean
) => {
  try {
    await updateDoc(
      doc(database, "todos", userId.toString(), "posts", todoId),
      {
        isCompleted,
      }
    );

    return "todo update 완료";
  } catch (error) {
    throw new Error(`할 일 업데이트 중 오류 발생: ${error}`);
  }
};

export const deleteTodo = async (userId: number, todoId: string) => {
  try {
    await deleteDoc(doc(database, "todos", userId.toString(), "posts", todoId));

    return "todo 삭제 완료";
  } catch (error) {
    throw new Error(`할 일 삭제 중 오류 발생: ${error}`);
  }
};
