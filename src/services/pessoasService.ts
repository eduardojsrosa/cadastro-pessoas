import type { Pessoa } from "../types/Pessoa";

const STORAGE_KEY = "pessoas";

// Leitura dos dados do localStorage:
// O retorno é um Array do tipo Pessoas
const getStoredPessoas = (): Pessoa[] => {
    // Obter valor do localStorage
    const data = localStorage.getItem(STORAGE_KEY);
    // Retornar os dados ou um array vazio
    return data ? JSON.parse(data) : [];
};

// Salvar os dados no localStorage:
const setStoredPessoas = (pessoas: Pessoa[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pessoas));
};

// Retornar todas as pessoas:
export const getPessoas = (): Pessoa[] => getStoredPessoas();

// Adicionar uma noca pessoa:
export const addPessoa = (pessoa: Pessoa) => {
    const pessoas = getStoredPessoas();

    pessoa.id = pessoas.length ? pessoas[pessoas.length -1].id +1 : 1;
    pessoas.push(pessoa);

    setStoredPessoas(pessoas);
}

// Atualizar uma pessoa:
export const updatePessoa = (pessoa: Pessoa) => {
    const pessoas = getStoredPessoas().map((p) =>
        p.id === pessoa.id ? pessoa : p
    );

    setStoredPessoas(pessoas);
}

// Remover uma pessoa pelo ID
export const deletePessoa = (id: number) => {
    const pessoas = getStoredPessoas().filter((p) => p.id !== id);
    setStoredPessoas(pessoas);
};