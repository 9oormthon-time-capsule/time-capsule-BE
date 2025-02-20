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
exports.getLetters = exports.addLetter = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const firestore_1 = require("firebase/firestore");
// 편지 등록 함수
const addLetter = (userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        const nextYear = now.getFullYear() + 1;
        const currentMonth = now.getMonth();
        const canReadDate = new Date(nextYear, currentMonth, 1);
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "letters", userId.toString()), "posts"), {
            content,
            createdAt: (0, firestore_1.serverTimestamp)(),
            canReadDate: firestore_1.Timestamp.fromDate(canReadDate),
        });
        return docRef.id;
    }
    catch (error) {
        throw new Error(`편지 등록 중 오류 발생: ${error}`);
    }
});
exports.addLetter = addLetter;
// 편지 조회 함수
const getLetters = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "letters", userId.toString()), "posts"));
        const letters = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        return letters;
    }
    catch (error) {
        throw new Error(`편지 조회 중 오류 발생: ${error}`);
    }
});
exports.getLetters = getLetters;
