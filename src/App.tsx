import { useState } from "react";
import type { Pessoa } from "./types/Pessoa";
import 'antd/dist/reset.css';
import { Button, Table, Space, Tooltip } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const App = () => {
  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([
    { nome: 'Eduardo', email: 'teste@teste.com' },
    { nome: 'Camila', email: 'camila@teste.com' },
  ]);

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

      <input type="text" placeholder="O que deseja fazer?" />
      <button>Adicionar</button>

      <Table dataSource={listaPessoas} columns={columns} />
    </div>  
  );
};

export default App;