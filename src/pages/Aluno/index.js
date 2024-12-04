import React, { useState } from "react";
import * as C from "./styles";

const Aluno = ({ onCancel }) => {
  const [nomeAluno, setNomeAluno] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [contatoResponsavel, setContatoResponsavel] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!nomeAluno || !dataNascimento || !matricula || !contatoResponsavel || !diagnostico) {
      setError("Por favor, preencha todos os campos.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_aluno: nomeAluno,
          data_nascimento: dataNascimento,
          matricula: matricula,
          contato_responsavel: contatoResponsavel,
          diagnostico: diagnostico,
        }),
      });

      if (response.ok) {
        setSuccess("Informações do aluno salvas com sucesso!");
        setError("");
        // Limpa os campos após o sucesso
        setNomeAluno("");
        setDataNascimento("");
        setMatricula("");
        setContatoResponsavel("");
        setDiagnostico("");
      } else {
        setError("Erro ao salvar as informações. Tente novamente.");
        setSuccess("");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
      setSuccess("");
      console.error(err);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <C.Container>
      <C.Title>Cadastro do Aluno</C.Title>
      <input
        type="text"
        placeholder="Nome do Aluno"
        value={nomeAluno}
        onChange={(e) => [setNomeAluno(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "80%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <input
        type="date"
        placeholder="Data de Nascimento"
        value={dataNascimento}
        onChange={(e) => [setDataNascimento(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "80%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        title="Selecione a data de nascimento do aluno"
      />
      <input
        type="text"
        placeholder="Matrícula"
        value={matricula}
        onChange={(e) => [setMatricula(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "80%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Contato do Responsável"
        value={contatoResponsavel}
        onChange={(e) => [setContatoResponsavel(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "80%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <C.TextArea
        placeholder="Diagnóstico"
        value={diagnostico}
        onChange={(e) => [setDiagnostico(e.target.value), setError(""), setSuccess("")]}
      />
      {error && <C.LabelError>{error}</C.LabelError>}
      {success && <C.LabelSuccess>{success}</C.LabelSuccess>}
      <C.Flex gap="8px" width="80%">
        <C.BaseButton
          onClick={handleSubmit}
          background="#4caf50"
          hoverBackground="#388e3c"
        >
          Criar Usuário
        </C.BaseButton>
        <C.BaseButton
          background="#f44336"
          hoverBackground="#d32f2f"
          onClick={handleCancel}
        >
          Cancelar
        </C.BaseButton>
      </C.Flex>
    </C.Container>
  );
};

export default Aluno;
