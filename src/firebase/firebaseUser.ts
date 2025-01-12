import {
  doc,
  increment,
  setDoc,
  getDoc,
  updateDoc,
  collection,
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
