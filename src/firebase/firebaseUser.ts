import {
  doc,
  increment,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { database } from "../config/firebaseConfig";

export const setUsers = async (userData: any) => {
  const userInfo = {
    _id: userData.id,
    name: userData.kakao_account.profile.nickname,
    profileImage: userData.kakao_account.profile.profile_image_url,
  };

  const userRef = doc(
    collection(database, "timecapsule", "user", "users"),
    `${userInfo._id}`,
  );

  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const counterRef = doc(database, "timecapsule", "counter");

    const counterDoc = await getDoc(counterRef);
    if (!counterDoc.exists()) await setDoc(counterRef, { totalUser: 0 });

    await updateDoc(counterRef, {
      totalUser: increment(1),
    });

    await setDoc(userRef, userInfo);
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const userIdString = String(userId);

    const userRef = doc(database, "timecapsule", "user", "users", userIdString);
    const counterRef = doc(database, "timecapsule", "counter");

    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      await deleteDoc(userRef);
      console.log(`사용자 문서 삭제: ${userIdString}`);
    } else {
      console.warn(`사용자의 문서가 존재하지 않음: ${userIdString}`);
    }

    const counterDoc = await getDoc(counterRef);
    if (counterDoc.exists()) {
      await updateDoc(counterRef, {
        totalUser: increment(-1),
      });
    } else {
      console.error("counter document가 존재하지 않습니다.");
    }

    console.log(`사용자 ${userIdString}의 데이터가 삭제되었습니다.`);
  } catch (error) {
    console.error("사용자 삭제 중 오류 발생:", error);
  }
};
