import type { Pessoa } from "../types/Pessoa";
import { Space, Tooltip, Button, Table, Empty, Popconfirm, Descriptions } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import type { JSX } from "react";

interface PessoasTableProps {
  pessoas: Pessoa[];
  onEdit: (record: Pessoa) => void;
  onDelete: (id: number) => void;
}

export function PessoasTable({ pessoas, onEdit, onDelete }: PessoasTableProps): JSX.Element {  
  // title = cabeçalho da coluna
  // dataIndex = campo / nome do objeto
  // key é necessário devido ao map
  const columns: ColumnsType<Pessoa> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 50,
      fixed: 'left',
      sorter: (a: Pessoa, b: Pessoa) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: 'Nome Completo',
      dataIndex: 'nomeCompleto',
      key: 'nomeCompleto',
      sorter: (a: Pessoa, b: Pessoa) => a.nomeCompleto.localeCompare(b.nomeCompleto),
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      align: 'center',
      width: 100,
      sorter: (a: Pessoa, b: Pessoa) => { 
        const cpfA = a.cpf ?? "";
        const cpfB = b.cpf ?? "";

        return cpfA.localeCompare(cpfB);
      },
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dataNascimento',
      key: 'dataNascimento',
      align: 'center',
      width: 200,
      render: (value: Pessoa['dataNascimento']) => ( 
        value ? dayjs(value).format('DD/MM/YYYY') : ''
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      sorter: (a: Pessoa, b: Pessoa) => a.email.localeCompare(b.email),
    },  
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
      width: 200,
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
      width: 200,
    }, 
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      width: 50,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              shape="circle"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Deseja realmente excluir?"
              okText="Sim"
              cancelText="Não"
              onConfirm={() => onDelete(record.id)}
            >
              <Button 
                danger 
                icon={<DeleteOutlined />}
                shape="circle"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    }
  ];

  return (
    <Table 
      dataSource={pessoas} 
      columns={columns} 
      rowKey="id" 
      scroll={{ x: 'max-content' }}
      locale={{
        emptyText: (
          <Empty description="Nenhuma pessoa cadastrada" /> 
        )
      }}
      pagination={{
        pageSize: 10,
        showTotal: (total) => `${total} registros`,
      }}
      expandable={{
        expandedRowRender: (record: Pessoa): React.ReactNode => {
          const endereco = record.endereco;

          if (!endereco) return;

          return (
            <Descriptions title="Endereço" size="small">
              <Descriptions.Item label="CEP">
                {endereco.cep}
              </Descriptions.Item>
              <Descriptions.Item label="Logradouro">       
                {endereco.logradouro}
              </Descriptions.Item>
              <Descriptions.Item label="Número">
                {endereco.numeroEndereco}
              </Descriptions.Item>
              <Descriptions.Item label="Complemento">
                {endereco.complementoEndereco}
              </Descriptions.Item>
              <Descriptions.Item label="Bairro">
                {endereco.bairro}
              </Descriptions.Item>
              <Descriptions.Item label="Estado">
                {endereco.estado}
              </Descriptions.Item>
              <Descriptions.Item label="Cidade">
                {endereco.cidade}
              </Descriptions.Item>
            </Descriptions>
          )            
        },
        rowExpandable: (record) => !!record.endereco
      }}
    />
  )
}