export interface Pessoa {
    id: number;
    nomeCompleto: string;
    cpf?: string;
    dataNascimento?: string;
    email: string; 
    telefone?: string;
    
    cep?: string;
    logradouro?: string;
    numeroEndereco?: number;
    complementoEndereco?: number;
    bairro?: string;
    estado?: string;
    cidade?: string;    
    
    login?: string;
    senha?: string;
}