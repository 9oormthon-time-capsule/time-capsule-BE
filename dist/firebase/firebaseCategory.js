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
exports.deleteCategories = exports.modifyCategories = exports.getCategories = exports.addCategory = void 0;
const firestore_1 = require("firebase/firestore");
const firebaseConfig_1 = require("../config/firebaseConfig");
const addCategory = (userId, categoryName, textColor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "categories", userId.toString()), "category"), {
            categoryName,
            textColor,
            createdAt: (0, firestore_1.serverTimestamp)(),
        });
        return docRef.id;
    }
    catch (error) {
        throw new Error(`카테고리 추가 중 오류 발생: ${error}`);
    }
});
exports.addCategory = addCategory;
const getCategories = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "categories", userId.toString()), "category"));
        const categories = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        return categories;
    }
    catch (error) {
        throw new Error(`카테고리 조회 중 오류 발생: ${error}`);
    }
});
exports.getCategories = getCategories;
const modifyCategories = (userId, categoryId, categoryName, textColor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryDocRef = (0, firestore_1.doc)(firebaseConfig_1.database, "categories", userId.toString(), "category", categoryId);
        yield (0, firestore_1.updateDoc)(categoryDocRef, {
            categoryName,
            textColor,
        });
    }
    catch (error) {
        throw new Error(`카테고리 수정 중 오류 발생: ${error}`);
    }
});
exports.modifyCategories = modifyCategories;
const deleteCategories = (userId, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryDocRef = (0, firestore_1.doc)(firebaseConfig_1.database, "categories", userId.toString(), "category", categoryId);
        yield (0, firestore_1.deleteDoc)(categoryDocRef);
        console.log(`카테고리 ${categoryId}가 성공적으로 삭제되었습니다.`);
    }
    catch (error) {
        throw new Error(`카테고리 삭제 중 오류 발생: ${error}`);
    }
});
exports.deleteCategories = deleteCategories;
