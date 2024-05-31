"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = exports.PORT = exports.CONNECTION_STRING = exports.NODE_ENV = void 0;
require('dotenv').config();
exports.NODE_ENV = process.env.NODE_ENV || "development";
exports.CONNECTION_STRING = process.env.CONNECTION_STRING;
exports.PORT = process.env.PORT || 3000;
exports.SECRET_KEY = process.env.SECRET_KEY;
