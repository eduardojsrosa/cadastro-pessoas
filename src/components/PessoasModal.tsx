import { Button, Form, Input, Modal } from "antd";
import type { Pessoa } from "../types/Pessoa";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect } from "react";

interface PessoasModalProps {
  open: boolean;
  pessoa: Pessoa | null;
  onCancel: () => void;
  onSubmit: (record: Pessoa) => void;
}

export function PessoasModal({ open, pessoa, onCancel, onSubmit }: PessoasModalProps) {

  const [form] = Form.useForm();

  // Para atualizar o modal:
  useEffect(() => {
    form.resetFields;

    if (pessoa) {
      form.setFieldsValue(pessoa);
    }
  }, [open, pessoa]);

  function handleFinish (values: Pessoa) {
    onSubmit({ ...pessoa, ...values });
    form.resetFields;
  }

  return (
    <Modal
      title={pessoa ? "Editar" : "Incluir"}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button 
          key="back"
          icon={<ReloadOutlined />}
          onClick={() => form.resetFields()}
        >
          Limpar
        </Button>,
        <Button 
          key="submit" 
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => form.submit()}
        >
          Salvar
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

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
      </Form>
    </Modal>
  );
}