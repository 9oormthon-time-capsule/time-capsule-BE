import { database } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
} from "firebase/firestore";

// 편지 등록 함수
export const addLetter = async (user_id: number, content: string) => {
  try {
    const docRef = await addDoc(
      collection(doc(database, "letters", user_id.toString()), "posts"),
      {
        content,
        is_read: false,
        created_at: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    throw new Error(`편지 등록 중 오류 발생: ${error}`);
  }
};

// 편지 조회 함수
export const getLetters = async (user_id: number) => {
  try {
    const querySnapshot = await getDocs(
      collection(doc(database, "letters", user_id.toString()), "posts")
    );
    const letters = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return letters;
  } catch (error) {
    throw new Error(`편지 조회 중 오류 발생: ${error}`);
  }
};
