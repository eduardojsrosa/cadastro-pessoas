import { PessoasPage } from "./components/PessoasPage";

const App = () => {
  return (
    <PessoasPage />
  )

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isNewRecord, setIsNewRecord] = useState(false);

  // const [form] = Form.useForm();

  // const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([
  //   { id: 1, nome: 'Eduardo', email: 'teste@teste.com' },
  //   { id: 2, nome: 'Camila', email: 'camila@teste.com' },
  // ]);

  // const handleSubmit = (values: Pessoa) => {
  //   let newList: Pessoa[];
    
  //   // Alteração
  //   if (values.id) {
  //     // Percorrer a lista com map
  //     // Se encontrar o ID corresponde os valores serão substituídos pelo "values" vindo do form
  //     // Senão permanece os valores que já estavam no "record"
  //     newList = listaPessoas.map(record =>
  //       record.id === values.id ? values : record
  //     );  
  //   } else { // Inclusão
  //     // Verificar o próximo ID. Default é 1 ou maior ID da lista +1
  //     const nextId =
  //       listaPessoas.length === 0
  //         ? 1
  //         : Math.max(...listaPessoas.map(p => Number(p.id))) + 1;

  //     newList = [...listaPessoas, { ...values, id: nextId }];
  //   } 
    
  //   setListaPessoas(newList);
  //   form.resetFields();
  //   setIsModalOpen(false);
  // }

  // const handleEdit = (values: Pessoa) => {
  //   form.setFieldsValue(values);
  //   setIsNewRecord(false);
  //   setIsModalOpen(true);
  // }

  // const handleDelete = (id: number) => {
  //   // O filter vai retornar um novo array removendo o item
  //   setListaPessoas(
  //     listaPessoas.filter(item => item.id !== id)
  //   );
  // }

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // }

  // const handleAddRecord = () => {
  //   setIsNewRecord(true);
  //   setIsModalOpen(true);
  // }

  // // title = cabeçalho da coluna
  // // dataIndex = campo / nome do objeto
  // // key é necessário devido ao map
  // const columns: TableProps<Pessoa>['columns'] = [
  //   {
  //     title: 'ID',
  //     dataIndex: 'id',
  //     key: 'id',
  //   },
  //   {
  //     title: 'Nome',
  //     dataIndex: 'nome',
  //     key: 'nome',
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'email',
  //     key: 'email',
  //   },
  //   {
  //     title: 'Ações',
  //     key: 'acoes',
  //     render: (_, record) => (
  //       <Space>
  //         <Tooltip title="Editar">
  //           <Button 
  //             type="primary" 
  //             icon={<EditOutlined />} 
  //             shape="circle"
  //             onClick={() => handleEdit(record)}
  //           />
  //         </Tooltip>
  //         <Tooltip title="Excluir">
  //           <Button 
  //             danger 
  //             icon={<DeleteOutlined />}
  //             shape="circle"
  //             onClick={() => handleDelete(record.id)}
  //           />
  //         </Tooltip>
  //       </Space>
  //     ),
  //   }
  // ];

  // return (
  //   <Layout>
  //     <h1>Lista de Pessoas</h1>
  //     <Button
  //       type="primary"
  //       icon={<PlusOutlined />}
  //       onClick={handleAddRecord}
  //     >
  //       Incluir
  //     </Button>

  //     <Modal
  //       title={isNewRecord ? "Incluir" : "Editar"}
  //       open={isModalOpen}
  //       onCancel={handleCloseModal}
  //       footer={[
  //         <Button 
  //           key="back"
  //           icon={<ReloadOutlined />}
  //           onClick={() => form.resetFields()}
  //         >
  //           Limpar
  //         </Button>,
  //         <Button 
  //           key="submit" 
  //           type="primary"
  //           icon={<PlusOutlined />}
  //           onClick={() => form.submit()}
  //         >
  //           Salvar
  //         </Button>,
  //       ]}
  //     >
  //       <Form
  //         form={form}
  //         layout="vertical"
  //         onFinish={handleSubmit}
  //       >
  //         <Form.Item name="id" hidden>
  //           <Input />
  //         </Form.Item>

  //         <Form.Item
  //           label="Nome"
  //           name="nome"
  //           rules={[{
  //             required: true,
  //             message: 'Digite o nome'
  //           }]}
  //         >
  //           <Input placeholder="Nome" />
  //         </Form.Item>

  //         <Form.Item
  //           label="Email"
  //           name="email"
  //           rules={[{
  //             required: true,
  //             message: 'Digite o email',
  //             type: 'email'
  //           }]}
  //         >
  //           <Input placeholder="Email" />
  //         </Form.Item>
  //       </Form>
  //     </Modal>

  //     <Table dataSource={listaPessoas} columns={columns} rowKey="id" />
  //   </Layout>  
  // );
};

export default App;