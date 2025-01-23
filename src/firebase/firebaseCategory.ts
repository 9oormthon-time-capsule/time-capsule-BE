import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
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

export const modifyCategories = async (
  userId: number,
  categoryId: string,
  categoryName: string,
  textColor: string
) => {
  try {
    const categoryDocRef = doc(
      database,
      "categories",
      userId.toString(),
      "category",
      categoryId
    );

    await updateDoc(categoryDocRef, {
      categoryName,
      textColor,
    });
  } catch (error) {
    throw new Error(`카테고리 수정 중 오류 발생: ${error}`);
  }
};

export const deleteCategories = async (userId: number, categoryId: string) => {
  try {
    const categoryDocRef = doc(
      database,
      "categories",
      userId.toString(),
      "category",
      categoryId
    );

    await deleteDoc(categoryDocRef);

    console.log(`카테고리 ${categoryId}가 성공적으로 삭제되었습니다.`);
  } catch (error) {
    throw new Error(`카테고리 삭제 중 오류 발생: ${error}`);
  }
};
