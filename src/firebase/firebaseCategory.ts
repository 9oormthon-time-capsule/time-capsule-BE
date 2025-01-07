import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "../config/firebaseConfig";

export const addCategory = async (
  userId: number,
  categoryName: string,
  textColor: string
) => {
  try {
    const docRef = await addDoc(
      collection(doc(database, "categories", userId.toString()), "category"),
      {
        categoryName,
        textColor,
        createdAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    throw new Error(`카테고리 추가 중 오류 발생: ${error}`);
  }
};

export const getCategories = async (userId: number) => {
  try {
    const querySnapshot = await getDocs(
      collection(doc(database, "categories", userId.toString()), "category")
    );
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categories;
  } catch (error) {
    throw new Error(`카테고리 조회 중 오류 발생: ${error}`);
  }
};
