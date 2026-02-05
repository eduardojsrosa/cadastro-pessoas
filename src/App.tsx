import { useState } from "react";
import { PessoasList } from "./pages/PessoasList";
import type { Pessoa } from "./types/Pessoa";
import { Button, Modal } from "antd";

function App() {
  // Esse estado vai servir para testar o botão "Editar"
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);

  // Função para passar para o PessoasList
  const handleEdit = (pessoa: Pessoa) => {
    setEditingPessoa(pessoa);
    Modal.info({
      title: "Editar Pessoa",
      content: (
        <div>
          <p>Você clicou em editar:</p>
          <p>Nome: {pessoa.nomeCompleto}</p>
          <p>CPF: {pessoa.cpf}</p>
        </div>
      ),
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Teste de PessoasList</h1>
      <PessoasList onEdit={handleEdit} />
    </div>
  );
}

export default App;

// localStorage.setItem('pessoas', JSON.stringify([
//   {id: 1, nomeCompleto:"João Silva", cpf:"123.456.789-00", email:"joao@email.com", cidade:"São Paulo"}
// ]));
