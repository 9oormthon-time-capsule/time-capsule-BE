import { database } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  Timestamp,
} from "firebase/firestore";

// 편지 등록 함수
export const addLetter = async (userId: number, content: string) => {
  try {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const currentMonth = now.getMonth();
    const canReadDate = new Date(nextYear, currentMonth, 1);

    const docRef = await addDoc(
      collection(doc(database, "letters", userId.toString()), "posts"),
      {
        content,
        createdAt: serverTimestamp(),
        canReadDate: Timestamp.fromDate(canReadDate),
      }
    );

    return docRef.id;
  } catch (error) {
    throw new Error(`편지 등록 중 오류 발생: ${error}`);
  }
};

// 편지 조회 함수
export const getLetters = async (userId: number) => {
  try {
    const querySnapshot = await getDocs(
      collection(doc(database, "letters", userId.toString()), "posts")
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
