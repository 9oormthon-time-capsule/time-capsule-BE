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
exports.getReflect = exports.addReflect = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const firestore_1 = require("firebase/firestore");
// 회고 등록 함수
const addReflect = (userId, content, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "reflects", userId.toString()), "posts"), {
            content,
            emoji,
            createdAt: (0, firestore_1.serverTimestamp)(),
        });
        return docRef.id;
    }
    catch (error) {
        throw new Error(`회고 등록 중 오류 발생: ${error}`);
    }
});
exports.addReflect = addReflect;
// 회고 조회 함수
const getReflect = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reflectCollection = (0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "reflects", userId.toString()), "posts");
        const reflectsQuery = (0, firestore_1.query)(reflectCollection, (0, firestore_1.orderBy)("createdAt", "desc"));
        const querySnapshot = yield (0, firestore_1.getDocs)(reflectsQuery);
        const reflects = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        return reflects;
    }
    catch (error) {
        throw new Error(`회고 조회 중 오류 발생: ${error}`);
    }
});
exports.getReflect = getReflect;
