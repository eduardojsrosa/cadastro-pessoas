import type { Pessoa } from "../types/Pessoa";
import { Space, Tooltip, Button, type TableProps, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Excluir">
            <Button 
              danger 
              icon={<DeleteOutlined />}
              shape="circle"
              onClick={() => onDelete(record.id)}
            />
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
    />
  )
}