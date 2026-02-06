import { useState } from "react";
import type { Pessoa } from "./types/Pessoa";
import 'antd/dist/reset.css';
import { Button, Table, Space, Tooltip, Form, Input, Card } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const App = () => {
  
  const [form] = Form.useForm();

  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([
    { nome: 'Eduardo', email: 'teste@teste.com' },
    { nome: 'Camila', email: 'camila@teste.com' },
  ]);

  const handleSubmit = (values: Pessoa) => {
    setListaPessoas([
      ...listaPessoas, // clone da lista
      values // add objeto novo
    ]);  

    form.resetFields();
  }

  // title = cabeçalho da coluna
  // dataIndex = campo / nome do objeto
  // key é necessário devido ao map
  const columns: TableProps<Pessoa>['columns'] = [
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
            />
          </Tooltip>
        </Space>
      ),
    }
  ];

  return (
    <div>
      <h1>Lista de Pessoas</h1>

      <Card>
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
      </Card>

      <Table dataSource={listaPessoas} columns={columns} rowKey="email" />
    </div>  
  );
};

export default App;