import type { Endereco } from "./Endereco";

export interface Pessoa {
  id: number;
  nomeCompleto: string;
  cpf?: string;
  dataNascimento?: string;
  email: string; 
  telefone?: string;
  
  endereco?: Endereco;  
  
  login?: string;
  senha?: string;
}