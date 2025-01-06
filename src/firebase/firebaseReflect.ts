import { database } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

// 회고 등록 함수
export const addReflect = async (user_id: number, content: string) => {
  try {
    const docRef = await addDoc(collection(database, "reflects"), {
      user_id,
      content,
      created_at: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    throw new Error(`회고 등록 중 오류 발생: ${error}`);
  }
};

// 회고 조회 함수
export const getReflect = async (user_id: number) => {
  try {
    const querySnapshot = await getDocs(collection(database, "reflects"));
    const reflects = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        user_id: doc.data().user_id,
        ...doc.data(),
      }))
      .filter((reflect) => reflect.user_id === user_id);

    return reflects;
  } catch (error) {
    throw new Error(`회고 조회 중 오류 발생: ${error}`);
  }
};
