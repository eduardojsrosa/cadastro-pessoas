import type { Pessoa } from "../types/Pessoa";
import type { PessoaFormValues } from "../types/PessoaFormValues";

// Função responsável por converter os dados do Form para Entidade Pessoa
export function formToPessoa (values: PessoaFormValues, pessoa?: Pessoa): Pessoa {
 
  const contemEndereco = values.cep || 
                         values.logradouro ||
                         values.bairro ||
                         values.cidade;
  
  return {
    ...pessoa,
    ...values,
    endereco: contemEndereco 
      ? {
        cep: values.cep,
        logradouro: values.logradouro,
        numeroEndereco: values.numeroEndereco,
        complementoEndereco: values.complementoEndereco,
        bairro: values.bairro,
        estado: values.estado,
        cidade: values.cidade,
      }
      : undefined,
  };
}

// Função responsável por converter a Entidade Pessoa para valores do Form
export function pessoaToForm (pessoa: Pessoa): PessoaFormValues {
  return {
    ...pessoa,
    ...pessoa.endereco
  };
}