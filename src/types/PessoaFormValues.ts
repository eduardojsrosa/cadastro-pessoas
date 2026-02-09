import type { Pessoa } from "./Pessoa";

export interface PessoaFormValues extends Omit<Pessoa, "endereco"> {
  cep?: string;
  logradouro?: string;
  numeroEndereco?: number;
  complementoEndereco?: string;
  bairro?: string;
  estado?: string;
  cidade?: string;  
}