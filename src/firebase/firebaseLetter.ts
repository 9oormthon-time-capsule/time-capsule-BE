import { database } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

// 편지 등록 함수
export const addLetter = async (user_id: string, content: string) => {
  try {
    const docRef = await addDoc(collection(database, "letters"), {
      user_id,
      content,
      is_read: false,
      created_at: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    throw new Error(`편지 등록 중 오류 발생: ${error}`);
  }
};

// 편지 조회 함수
export const getLetters = async (user_id: string) => {
  try {
    const querySnapshot = await getDocs(collection(database, "letters"));
    const letters = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        user_id: doc.data().user_id,
        ...doc.data(),
      }))
      .filter((letter) => letter.user_id === user_id);

    return letters;
  } catch (error) {
    throw new Error(`편지 조회 중 오류 발생: ${error}`);
  }
};
