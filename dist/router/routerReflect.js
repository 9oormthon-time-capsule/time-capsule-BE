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
const firebaseReflect_1 = require("../firebase/firebaseReflect");
const router = (0, express_1.Router)();
// 회고 등록 엔드포인트
router.post("/timecapsule/reflect", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id; // 세션에서 사용자 ID 가져옴
    const { content, emoji } = req.body;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const reflectId = yield (0, firebaseReflect_1.addReflect)(userId, content, emoji);
        res.status(201).send(`회고가 등록되었습니다. ID: ${reflectId}`);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// 회고 조회 엔드포인트
router.get("/timecapsule/reflect", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).send("로그인이 필요합니다.");
        return;
    }
    try {
        const reflects = yield (0, firebaseReflect_1.getReflect)(userId); // 세션 ID를 사용
        res.status(200).json(reflects);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
