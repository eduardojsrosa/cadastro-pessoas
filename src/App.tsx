import { useState } from "react";
import type { Pessoa } from "./types/Pessoa";
import 'antd/dist/reset.css';
import { Button, Table, Space, Tooltip, Form, Input, Card, Modal } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const App = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([
    { id: 1, nome: 'Eduardo', email: 'teste@teste.com' },
    { id: 2, nome: 'Camila', email: 'camila@teste.com' },
  ]);

  const handleSubmit = (values: Pessoa) => {
    // Verificar o próximo ID. Default é 1 ou maior ID da lista +1
    const nextId =
      listaPessoas.length === 0
        ? 1
        : Math.max(...listaPessoas.map(p => Number(p.id))) + 1;

    setListaPessoas(
      [...listaPessoas, {...values, id: nextId}]
    );

    form.resetFields();
  }

  const deletePessoa = (id: number) => {
    // O filter vai retornar um novo array removendo o item
    setListaPessoas(
      listaPessoas.filter(item => item.id !== id)
    );
  }

  // title = cabeçalho da coluna
  // dataIndex = campo / nome do objeto
  // key é necessário devido ao map
  const columns: TableProps<Pessoa>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              shape="circle"
            />
          </Tooltip>
          <Tooltip title="Excluir">
            <Button 
              danger 
              icon={<DeleteOutlined />}
              shape="circle"
              onClick={() => deletePessoa(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    }
  ];

  return (
    <div>
      <h1>Lista de Pessoas</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Adicionar
      </Button>

      <Modal
        title="Teste"
        open={isModalOpen}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{
              required: true,
              message: 'Digite o nome'
            }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{
              required: true,
              message: 'Digite o email',
              type: 'email'
            }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
              >
                Adicionar
              </Button>

              <Button
                htmlType="reset"
                icon={<ReloadOutlined />}
              >
                Limpar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Table dataSource={listaPessoas} columns={columns} rowKey="id" />
    </div>  
  );
};

export default App;