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
const firebaseCategory_1 = require("../firebase/firebaseCategory");
const router = (0, express_1.Router)();
router.post("/todo/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    const { categoryName, textColor } = req.body;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const categoryId = yield (0, firebaseCategory_1.addCategory)(userId, categoryName, textColor);
        res.status(201).json({ message: "카테고리가 추가되었습니다.", categoryId });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
router.get("/todo/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const categories = yield (0, firebaseCategory_1.getCategories)(userId);
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send(error.message);
    }
}));
router.patch("/todo/category/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    const { categoryId } = req.params;
    const { categoryName, textColor } = req.body;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    if (!categoryId) {
        res.status(400).send("카테고리 ID가 필요합니다.");
        return;
    }
    try {
        const categories = yield (0, firebaseCategory_1.modifyCategories)(userId, categoryId, categoryName, textColor);
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
router.delete("/todo/category/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    const { categoryId } = req.params;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    if (!categoryId) {
        res.status(400).send("카테고리 ID가 필요합니다.");
        return;
    }
    try {
        const categories = yield (0, firebaseCategory_1.deleteCategories)(userId, categoryId);
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
