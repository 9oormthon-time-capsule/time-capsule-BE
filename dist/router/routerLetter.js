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
const firebaseLetter_1 = require("../firebase/firebaseLetter");
const router = (0, express_1.Router)();
// 편지 등록 엔드 포인트
router.post("/timecapsule/letter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    const { content } = req.body;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const letterId = yield (0, firebaseLetter_1.addLetter)(userId, content);
        res.status(201).send(`편지가 등록되었습니다. ID: ${letterId}`);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// 편지 조회 엔드 포인트
router.get("/timecapsule/letter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const letters = yield (0, firebaseLetter_1.getLetters)(userId);
        res.status(200).json(letters);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
