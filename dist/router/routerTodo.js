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
const express_1 = require("express");
const firebaseTodo_1 = require("../firebase/firebaseTodo");
const router = (0, express_1.Router)();
router.post("/todo/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id; // 세션에서 사용자 ID 가져옴
    const { task, categoryId, selectedDate } = req.body;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const todoId = yield (0, firebaseTodo_1.addTodo)(userId, task, categoryId, selectedDate);
        res.status(201).send(`할 일이 등록되었습니다. ID: ${todoId}`);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
router.get("/todo/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const todos = yield (0, firebaseTodo_1.getTodo)(userId); // 세션 ID를 사용
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
router.patch("/todo/task/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    const { todoId } = req.params;
    const { task, isCompleted } = req.body;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        yield (0, firebaseTodo_1.updateTodo)(userId, todoId, task, isCompleted);
        res.status(200).send("할 일이 수정되었습니다.");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
router.delete("/todo/task/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    const { todoId } = req.params;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        yield (0, firebaseTodo_1.deleteTodo)(userId, todoId);
        res.status(200).send("할 일이 삭제되었습니다.");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
