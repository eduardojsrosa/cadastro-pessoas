export interface Pessoa {
    id: number;
    nomeCompleto: string;
    cpf?: string;
    dataNascimento?: string;
    email: string; 
    telefone?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    login?: string;
    senha?: string;
}