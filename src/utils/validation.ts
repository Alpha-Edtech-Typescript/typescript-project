// Exporta função que valida email
export function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Exporta função que valida senha
export function validatePassword(password: string): boolean {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

// Exporta função que valida name
export function validateName(name: string): boolean {
    const cleanedName = name.replace(/\s+/g, '');
    return /^[A-Za-z\s]+$/.test(name) && cleanedName.length >= 4;
}
