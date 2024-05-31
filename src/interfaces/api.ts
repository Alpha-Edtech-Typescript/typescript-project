// api.ts

// Define uma interface para padronizar a estrutura das respostas da API
export interface IAPIResponse<T> {
	success: boolean;
	message?: string;
	data?: T;
	error?: string;
}
