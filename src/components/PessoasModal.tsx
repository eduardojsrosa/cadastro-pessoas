import { Button, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import type { Pessoa } from "../types/Pessoa";
import { MailOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

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
    if (!open) return;

    form.resetFields();

    if (pessoa) {
      form.setFieldsValue(pessoa);
    }
  }, [open]);

  function handleFinish (values: Pessoa) {
    onSubmit({ ...pessoa, ...values });
    console.table(values);
  }

  return (
    <Modal
      title={"Manutenção de Pessoas - " + (pessoa ? "Editar" : "Incluir")}
      open={open}
      onCancel={onCancel}
      width={900}
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

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nome"
              name="nomeCompleto"
              rules={[
                { required: true, message: 'Informe o nome' },
                { min: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
              ]}
            >
              <Input 
                placeholder="Nome" 
                allowClear 
                max={100}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Informe o email' },
                { type: 'email', message: 'Email inválido' }
              ]}
            >
              <Input 
                placeholder="Email" 
                prefix={<MailOutlined />}
                allowClear 
              />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          label="CPF"
          name="cpf" 
          rules={[{ min: 11, max: 11 }]}   
        >
          <Input 
            minLength={11} 
            maxLength={11} 
            allowClear 
          />
          
        </Form.Item>

        <Form.Item
          label="Data de Nascimento"
          name="dataNascimento"
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Telefone"
          name="telefone"
        >
          <Input allowClear />
        </Form.Item>        
      </Form>
    </Modal>
  );
}