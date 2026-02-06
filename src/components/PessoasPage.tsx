import { useState } from "react";
import type { Pessoa } from "../types/Pessoa";
import 'antd/dist/reset.css';
import { Button, Layout, Typography } from "antd";
import { PessoasTable } from "./PessoasTable";
import { PessoasModal } from "./PessoasModal";
import { PlusOutlined } from "@ant-design/icons";

export function PessoasPage () {  

  // O State principal que contém a lista de pessoas será disponibilizado ao demais componentes
  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([
    { id: 1, nome: 'Eduardo', email: 'teste@teste.com' },
    { id: 2, nome: 'Camila', email: 'camila@teste.com' },
  ]);

  // Controles de estado para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Objeto Pessoa para ser passado ao Form
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);

  const gravarPessoa = (values: Pessoa) => {
    let newList: Pessoa[];

    if (editingPessoa) {
      // Percorrer a lista com map
      // Se encontrar o ID corresponde os valores serão substituídos pelo "values" vindo do form
      // Senão permanece os valores que já estavam no "record"
      newList = listaPessoas.map(record =>
        record.id === editingPessoa.id ? values : record
      );  
    } else {
      // Verificar o próximo ID. Default é 1 ou maior ID da lista +1
      const nextId =
        listaPessoas.length === 0
          ? 1
          : Math.max(...listaPessoas.map(p => Number(p.id))) + 1;

      newList = [...listaPessoas, { ...values, id: nextId }];
    }
    
    setListaPessoas(newList);
    setIsModalOpen(false);
  }

  const excluirPessoa = (id: number) => {
    // O filter vai retornar um novo array removendo o item
    setListaPessoas(
      listaPessoas.filter(item => item.id !== id)
    );
  }

  const editarPessoa = (values: Pessoa) => {
    setEditingPessoa(values);
    setIsModalOpen(true);
  }

  const adicionarPessoa = () => {
    setEditingPessoa(null);
    setIsModalOpen(true);  
  }

  return (
    <Layout>
      <Typography.Title>Cadastro de Pessoas</Typography.Title>

      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={adicionarPessoa}
      >
        Incluir
      </Button>

      <PessoasTable 
        pessoas={listaPessoas} 
        onEdit={editarPessoa} 
        onDelete={excluirPessoa} 
      />

      <PessoasModal
        open={isModalOpen}
        pessoa={editingPessoa}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={gravarPessoa}
      /> 
    </Layout>
  );
}