// Importações
const bcrypt = require("bcrypt");

// Função que compara senhas
export async function comparePassword(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	try {
		const match: boolean = await bcrypt.compare(password, hashedPassword);
		return match;
	} catch (error: any) {
		console.error("Erro ao comparar as senhas:", error);
		return false;
	}
}