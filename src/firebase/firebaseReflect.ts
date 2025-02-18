import { database } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

// 회고 등록 함수
export const addReflect = async (
  userId: number,
  content: string,
  emoji: string,
) => {
  try {
    const docRef = await addDoc(
      collection(doc(database, "reflects", userId.toString()), "posts"),
      {
        content,
        emoji,
        createdAt: serverTimestamp(),
      },
    );

    return docRef.id;
  } catch (error) {
    throw new Error(`회고 등록 중 오류 발생: ${error}`);
  }
};

// 회고 조회 함수
export const getReflect = async (userId: number) => {
  try {
    const reflectCollection = collection(
      doc(database, "reflects", userId.toString()),
      "posts",
    );

    const reflectsQuery = query(
      reflectCollection,
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(reflectsQuery);
    const reflects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return reflects;
  } catch (error) {
    throw new Error(`회고 조회 중 오류 발생: ${error}`);
  }
};
