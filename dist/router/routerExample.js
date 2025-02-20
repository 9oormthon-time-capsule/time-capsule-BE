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
const firebaseExample_1 = require("../firebase/firebaseExample");
const router = (0, express_1.Router)();
// 아이템 추가 엔드 포인트
router.post("/add-item", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const itemId = yield (0, firebaseExample_1.addItem)(name, description);
        res.status(201).send(`아이템이 추가되었습니다. ID: ${itemId}`);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// 아이템 조회 엔드 포인트
router.get("/items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield (0, firebaseExample_1.getItems)();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
