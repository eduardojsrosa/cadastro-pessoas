import { useState, useEffect } from "react";
import { Table, Button, Input, Space, Modal } from "antd";
import type { Pessoa } from "../types/Pessoa";
import { getPessoas, deletePessoa } from "../services/pessoasService";

interface Props {
    onEdit: (pessoa: Pessoa) => void;
}

export const PessoasList = ({ onEdit }: Props) => {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setPessoas(getPessoas());
    }, []);

    const filteredPessoas = pessoas.filter((p) =>
        [p.nomeCompleto, p.cpf, p.email, p.cidade].some((field) =>
            field.toLowerCase().includes(search.toLowerCase())
        )
    );

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Tem certeza que deseja excluir?",
            onOk: () => {
                deletePessoa(id);
                setPessoas(getPessoas());
            },
        })
    };

    const columns = [
        {title: "Nome", dataIndex: "nomeCompleto", key: "nomeCompleto"},
        {title: "CPF", dataIndex: "cpf", key: "cpf"},

        {
            title: "Ações",
            key: "acoes",
            render: (_text: any, record: Pessoa) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Editar
                    </Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Excluir
                    </Button>
                </Space>    
            ),
        },
    ];

    return (
        <div>
            <Input 
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 16 }}
            />

            <Table dataSource={filteredPessoas} columns={columns} rowKey="id" />
        </div>
    );
};