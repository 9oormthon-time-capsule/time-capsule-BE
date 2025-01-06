import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebaseConfig";

export const addCategory = async (
  userId: string,
  categoryName: string,
  color: string
) => {
  try {
    const docRef = await addDoc(collection(database, "category"), {
      userId,
      categoryName,
      color,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    throw new Error(`카테고리 추가 중 오류 발생: ${error}`);
  }
};

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(database, "category"));
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categories;
  } catch (error) {
    throw new Error(`카테고리 조회 중 오류 발생: ${error}`);
  }
};
