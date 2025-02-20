"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const serviceAccount = require('../../config');
try {
    exports.app = (0, app_1.getApp)('app');
}
catch (e) {
    exports.app = (0, app_1.initializeApp)(serviceAccount, 'app');
}
exports.database = (0, firestore_1.getFirestore)(exports.app);
