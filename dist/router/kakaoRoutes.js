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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakaoRouter = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const firebaseUser_1 = require("../firebase/firebaseUser");
exports.kakaoRouter = (0, express_1.Router)();
dotenv_1.default.config();
const kakao = {
    CLIENT_ID: process.env.KAKAO_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
};
/* login 이후 나타나는 callback page */
exports.kakaoRouter.get("/oauth/callback/kakao", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* access token 발급 */
    let token;
    try {
        token = yield (0, axios_1.default)({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            data: qs_1.default.stringify({
                grant_type: "authorization_code",
                client_id: kakao.CLIENT_ID,
                redirect_uri: kakao.REDIRECT_URI,
                code: req.query.code,
            }),
        });
    }
    catch (error) {
        console.error("토근을 불러올 수 없습니다.", error);
        return res.status(400).json({ error: "토큰 발급 실패" });
    }
    /* access token 발급받은 뒤 사용자 정보 가져옴 */
    let user;
    try {
        user = yield (0, axios_1.default)({
            method: "GET",
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                Authorization: `Bearer ${token.data.access_token}`,
            },
        });
    }
    catch (error) {
        console.error("유저 데이터를 불러올 수 없습니다.", error);
        return res.status(400).json({ error: "사용자 정보 조회 실패" });
    }
    /* 가지고 온 사용자 정보 DB & session 저장 */
    yield (0, firebaseUser_1.setUsers)(user.data);
    req.session.userData = {
        _id: user.data.id,
        name: user.data.kakao_account.profile.nickname,
        profileImage: user.data.kakao_account.profile.profile_image_url,
        accessToken: token.data.access_token,
    };
    yield req.session.save(); // 세션 저장
    res.redirect(`https://tcapsule.shop/main`);
}));
/* session에 저장된 사용자 정보 Client 전달 */
exports.kakaoRouter.get("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.session.userData;
        res.status(200).json(userData);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ e: "사용자 조회 실패" });
    }
}));
/* 카카오 로그아웃 API */
exports.kakaoRouter.post("/api/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a.accessToken;
    if (!accessToken) {
        return res.status(401).json({ error: "로그인 상태가 아닙니다." });
    }
    try {
        yield (0, axios_1.default)({
            method: "POST",
            url: "https://kapi.kakao.com/v1/user/logout",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        delete req.session.userData;
        yield req.session.save();
        res.status(200).json({ message: "로그아웃 성공" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "로그아웃 실패" });
    }
}));
exports.kakaoRouter.delete("/api/withdraw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        return res.status(401).json({ error: "로그인 상태가 아닙니다." });
    }
    try {
        yield (0, firebaseUser_1.deleteUser)(userId);
        delete req.session.userData;
        yield req.session.save();
        res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
    }
    catch (error) {
        console.error("회원 탈퇴 실패:", error);
        res.status(500).json({ error: "회원 탈퇴 중 오류가 발생했습니다." });
    }
}));
