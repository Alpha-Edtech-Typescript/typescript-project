"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = exports.validatePassword = exports.validateEmail = void 0;
// Exporta função que valida email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
exports.validateEmail = validateEmail;
// Exporta função que valida senha
function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}
exports.validatePassword = validatePassword;
// Exporta função que valida name
function validateName(name) {
    const cleanedName = name.replace(/\s+/g, '');
    return /^[A-Za-z\s]+$/.test(name) && cleanedName.length >= 4;
}
exports.validateName = validateName;
