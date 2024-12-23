import { database } from '../config/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// 아이템 추가 함수
export const addItem = async (name: string, description: string) => {
  try {
    const docRef = await addDoc(collection(database, 'items'), {
      name,
      description,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    throw new Error(`아이템 추가 중 오류 발생: ${error}`);
  }
};

// 아이템 조회 함수
export const getItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(database, 'items'));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return items;
  } catch (error) {
    throw new Error(`아이템 조회 중 오류 발생: ${error}`);
  }
};
