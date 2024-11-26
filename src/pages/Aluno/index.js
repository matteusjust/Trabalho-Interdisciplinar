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

  const handleSubmit = () => {
    if (!nomeAluno) {
      setError("Por favor, insira o nome do aluno.");
      setSuccess("");
      return;
    }

    if (!dataNascimento) {
      setError("Por favor, insira a data de nascimento.");
      setSuccess("");
      return;
    }

    if (!matricula) {
      setError("Por favor, insira a matrícula.");
      setSuccess("");
      return;
    }

    if (!contatoResponsavel) {
      setError("Por favor, insira o contato do responsável.");
      setSuccess("");
      return;
    }

    if (!diagnostico) {
      setError("Por favor, insira o diagnóstico.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Informações do aluno salvas com sucesso!");
    console.log("Aluno:", {
      nomeAluno,
      dataNascimento,
      matricula,
      contatoResponsavel,
      diagnostico,
    });
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
          Criar Usuario
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
