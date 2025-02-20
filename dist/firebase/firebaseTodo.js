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
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.addTodo = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const firestore_1 = require("firebase/firestore");
// Todo 등록 함수
const addTodo = (userId, task, categoryId, selectedDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "todos", userId.toString()), "posts"), {
            task,
            categoryId,
            isCompleted: false,
            selectedDate,
            createdAt: (0, firestore_1.serverTimestamp)(),
        });
        return docRef.id;
    }
    catch (error) {
        throw new Error(`할 일 등록 중 오류 발생: ${error}`);
    }
});
exports.addTodo = addTodo;
// todo 조회 함수
const getTodo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)((0, firestore_1.doc)(firebaseConfig_1.database, "todos", userId.toString()), "posts"));
        const todos = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        return todos;
    }
    catch (error) {
        throw new Error(`할 일 조회 중 오류 발생: ${error}`);
    }
});
exports.getTodo = getTodo;
// todo update 함수
const updateTodo = (userId, todoId, task, isCompleted) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebaseConfig_1.database, "todos", userId.toString(), "posts", todoId), {
            task,
            isCompleted,
        });
        return "todo update 완료";
    }
    catch (error) {
        throw new Error(`할 일 업데이트 중 오류 발생: ${error}`);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (userId, todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebaseConfig_1.database, "todos", userId.toString(), "posts", todoId));
        return "todo 삭제 완료";
    }
    catch (error) {
        throw new Error(`할 일 삭제 중 오류 발생: ${error}`);
    }
});
exports.deleteTodo = deleteTodo;
