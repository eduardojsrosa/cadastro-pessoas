import { Button, Card, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import type { Pessoa } from "../types/Pessoa";
import { MailOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import Search from "antd/es/transfer/search";

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

  // Para buscar o CEP e atualizar os campos:
  async function handleBuscarCEP (cep: string) {
  
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        form.setFieldsValue({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.estado,
        });
      } catch {

      }
  }

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

        <Card title="Dados Pessoais">
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
          
          <Row gutter={16}>
            <Col xs={24} md={12}>
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
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Data de Nascimento"
                name="dataNascimento"
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Telefone"
            name="telefone"
          >
            <Input allowClear />
          </Form.Item>
        </Card> 

        <Card title="Endereço">
          <Form.Item
            label="CEP"
            name="cep"
          >
            <Input.Search 
              placeholder="Digite o CEP"
              allowClear
              onSearch={(value) => handleBuscarCEP(value)}
            />
          </Form.Item>  

          <Form.Item
            label="Logradouro"
            name="logradouro"
          >
            <Input allowClear />
          </Form.Item> 

          <Form.Item
            label="Número"
            name="numeroEndereco"
          >
            <Input allowClear />
          </Form.Item> 

          <Form.Item
            label="Complemento"
            name="complementoEndereco"
          >
            <Input allowClear />
          </Form.Item> 

          <Form.Item
            label="Bairro"
            name="bairro"
          >
            <Input allowClear />
          </Form.Item> 

          <Form.Item
            label="Estado"
            name="estado"
          >
            <Input allowClear />
          </Form.Item> 

          <Form.Item
            label="Cidade"
            name="cidade"
          >
            <Input allowClear />
          </Form.Item>
        </Card> 

        <Card title="Acesso">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Login"
                name="login"
              >
                <Input allowClear />
              </Form.Item> 
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Senha"
                name="senha"
              >
                <Input.Password allowClear />
              </Form.Item>     
            </Col>
          </Row>
        </Card>             
      </Form>
    </Modal>
  );
}