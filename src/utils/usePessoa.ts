import { useState } from "react";
import type { Pessoa } from "../types/Pessoa";

export function usePessoa() {

  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([
    { id: 1, nome: 'Eduardo', email: 'teste@teste.com' },
    { id: 2, nome: 'Camila', email: 'camila@teste.com' },
  ]);

  function salvar (values: Pessoa) {
    let newList: Pessoa[];

    // Alteração
    if (values.id) {
      // Percorrer a lista com map
      // Se encontrar o ID corresponde os valores serão substituídos pelo "values" vindo do form
      // Senão permanece os valores que já estavam no "record"
      newList = listaPessoas.map(record =>
        record.id === values.id ? values : record
      );  
    } else { // Inclusão
      // Verificar o próximo ID. Default é 1 ou maior ID da lista +1
      const nextId =
        listaPessoas.length === 0
        ? 1
        : Math.max(...listaPessoas.map(p => Number(p.id))) + 1;

      newList = [...listaPessoas, { ...values, id: nextId }];
    }
  }  

  function remover (id: number) {
    // O filter vai retornar um novo array removendo o item
    setListaPessoas(
      listaPessoas.filter(item => item.id !== id)
    );
  }

  return {
    pessoas: listaPessoas,
    salvar,
    remover
  }
}