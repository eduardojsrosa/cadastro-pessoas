import { useState } from "react";
import type { Pessoa } from "../types/Pessoa";
import 'antd/dist/reset.css';
import { Button, Flex, Input, Layout, Typography } from "antd";
import { PessoasTable } from "./PessoasTable";
import { PessoasModal } from "./PessoasModal";
import { PlusOutlined } from "@ant-design/icons";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { message } from "antd/lib";

export function PessoasPage () {  

  // O State principal que contém a lista de pessoas será disponibilizado ao demais componentes
  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([
    { id: 1, nomeCompleto: 'Eduardo Rosa', cpf: '68066412029', email: 'teste@teste.com',  },
    { id: 2, nomeCompleto: 'Camila Rosa', cpf: '56748217040', email: 'camila@teste.com',  },
  ]);

  const [filtro, setFiltro] = useState('');

  // Derived State
  // Ele é o resultado de um filtro do state principal "listaPessoas"
  const pessoasFiltradas = listaPessoas.filter(pessoa =>
    pessoa.nomeCompleto.toLowerCase().includes(filtro.toLowerCase()) ||
    pessoa.email.toLowerCase().includes(filtro.toLowerCase())
  );

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

    message.success('Salvo com sucesso');
  }

  const excluirPessoa = (id: number) => {
    // O filter vai retornar um novo array removendo o item
    setListaPessoas(
      listaPessoas.filter(item => item.id !== id)
    );

    message.success('Registro excluído com sucesso');
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
    <Layout style={{ minHeight: "100vh" }}>
      <Header 
        style={{ 
          background: "#1677ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center" 
        }}
      >
        <Typography.Title 
          level={2} 
          style={{ color: "white", margin: "0 auto" }}
        >
          Cadastro de Pessoas
        </Typography.Title>
      </Header>

      <Content style={{ padding: "24px 48px" }}>
        <Flex 
          gap={10}
          style={{ padding: "10px 0" }}
        >
          <Input.Search 
            placeholder="Digite o termo para a pesquisa"
            allowClear
            onSearch={(value) => setFiltro(value)}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={adicionarPessoa}
          >
            Incluir
          </Button>
        </Flex>

        <PessoasTable 
          pessoas={pessoasFiltradas} 
          onEdit={editarPessoa} 
          onDelete={excluirPessoa} 
        />

        <PessoasModal
          open={isModalOpen}
          pessoa={editingPessoa}
          onCancel={() => setIsModalOpen(false)}
          onSubmit={gravarPessoa}
        /> 
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Desenvolvido por Eduardo Rosa
      </Footer>
    </Layout>
  );
}