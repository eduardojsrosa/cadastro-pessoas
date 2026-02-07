import type { Pessoa } from "../types/Pessoa";
import { Space, Tooltip, Button, type TableProps, Table, Empty, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface PessoasTableProps {
  pessoas: Pessoa[];
  onEdit: (record: Pessoa) => void;
  onDelete: (id: number) => void;
}

export function PessoasTable({ pessoas, onEdit, onDelete }: PessoasTableProps) {  
  // title = cabeçalho da coluna
  // dataIndex = campo / nome do objeto
  // key é necessário devido ao map
  const columns: TableProps<Pessoa>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 50,
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
      render: (value) => ( 
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
      title: 'Endereço',
      dataIndex: 'endereco',
      key: 'endereco',
      width: 300,
      render: (_, record) => (
        <div>
          {record.logradouro} 
        </div>
      ),
    },  
    {
      title: 'Cidade',
      dataIndex: 'cidade',
      key: 'cidade',
      width: 200,
    }, 
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      width: 200,
    },  
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
      width: 200,
    },  
    {
      title: 'Senha',
      dataIndex: 'senha',
      key: 'senha',
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
    />
  )
}