"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.setUsers = void 0;
const firestore_1 = require("firebase/firestore");
const firebaseConfig_1 = require("../config/firebaseConfig");
const setUsers = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = {
        _id: userData.id,
        name: userData.kakao_account.profile.nickname,
        profileImage: userData.kakao_account.profile.profile_image_url,
    };
    const userRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.database, "timecapsule", "user", "users"), `${userInfo._id}`);
    const userDoc = yield (0, firestore_1.getDoc)(userRef);
    if (!userDoc.exists()) {
        const counterRef = (0, firestore_1.doc)(firebaseConfig_1.database, "timecapsule", "counter");
        const counterDoc = yield (0, firestore_1.getDoc)(counterRef);
        if (!counterDoc.exists())
            yield (0, firestore_1.setDoc)(counterRef, { totalUser: 0 });
        yield (0, firestore_1.updateDoc)(counterRef, {
            totalUser: (0, firestore_1.increment)(1),
        });
        yield (0, firestore_1.setDoc)(userRef, userInfo);
    }
});
exports.setUsers = setUsers;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdString = String(userId);
        const userRef = (0, firestore_1.doc)(firebaseConfig_1.database, "timecapsule", "user", "users", userIdString);
        const counterRef = (0, firestore_1.doc)(firebaseConfig_1.database, "timecapsule", "counter");
        const userSnapshot = yield (0, firestore_1.getDoc)(userRef);
        if (userSnapshot.exists()) {
            yield (0, firestore_1.deleteDoc)(userRef);
            console.log(`사용자 문서 삭제: ${userIdString}`);
        }
        else {
            console.warn(`사용자의 문서가 존재하지 않음: ${userIdString}`);
        }
        const counterDoc = yield (0, firestore_1.getDoc)(counterRef);
        if (counterDoc.exists()) {
            yield (0, firestore_1.updateDoc)(counterRef, {
                totalUser: (0, firestore_1.increment)(-1),
            });
        }
        else {
            console.error("counter document가 존재하지 않습니다.");
        }
        console.log(`사용자 ${userIdString}의 데이터가 삭제되었습니다.`);
    }
    catch (error) {
        console.error("사용자 삭제 중 오류 발생:", error);
    }
});
exports.deleteUser = deleteUser;
