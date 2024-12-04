import React, { useState } from "react";
import * as C from "./styles";

const Funcionario = ({ onCancel }) => {
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [dias, setDias] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX"];
  const opcoesPeriodos = ["M", "V"];

  const handleSubmit = async () => {
    if (!nomeFuncionario) {
      setError("Por favor, insira o nome do funcionário.");
      setSuccess("");
      return;
    }

    if (!especialidade) {
      setError("Por favor, selecione uma especialidade.");
      setSuccess("");
      return;
    }

    if (dias.length === 0) {
      setError("Por favor, selecione ao menos um dia.");
      setSuccess("");
      return;
    }

    if (periodos.length === 0) {
      setError("Por favor, selecione ao menos um período.");
      setSuccess("");
      return;
    }

    const disponibilidade = { dias, periodos };

    const funcionario = {
      nome_funcionario: nomeFuncionario,
      id_especialidade: especialidade,
      disponibilidade: JSON.stringify(disponibilidade),
    };

    try {
      const response = await fetch('http://localhost:3000/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionario),
      });

      if (response.ok) {
        setError("");
        setSuccess("Funcionário cadastrado com sucesso!");
        setNomeFuncionario("");
        setEspecialidade("");
        setDias([]);
        setPeriodos([]);
      } else {
        setError("Erro ao cadastrar funcionário.");
        setSuccess("");
      }
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      setError("Erro ao conectar-se ao servidor.");
      setSuccess("");
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const toggleSelection = (array, setArray, value) => {
    setArray(array.includes(value) ? array.filter((item) => item !== value) : [...array, value]);
  };

  return (
    <C.Container style={{ color: "white", textAlign: "center" }}>
      <C.Title>Cadastro de Funcionário</C.Title>
      <input
        type="text"
        placeholder="Nome do Funcionário"
        value={nomeFuncionario}
        onChange={(e) => [setNomeFuncionario(e.target.value), setError(""), setSuccess("")]}
        style={{
          width: "80%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          margin: "8px auto",
          display: "block",
        }}
      />
      <select
        value={especialidade}
        onChange={(e) => [setEspecialidade(e.target.value), setError(""), setSuccess("")]}
        style={{
          width: "80%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          margin: "8px auto",
          display: "block",
        }}
      >
        <option value="">Selecione uma especialidade</option>
        <option value="1">Fonoaudiologia</option>
        <option value="2">Terapia Ocupacional</option>
        <option value="3">Psicomotricidade</option>
        <option value="4">Fisioterapia</option>
      </select>
      <div style={{ width: "80%", marginTop: "16px", textAlign: "center" }}>
        <label><strong>Dias da Semana:</strong></label>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          {diasSemana.map((dia) => (
            <label key={dia} style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={dias.includes(dia)}
                onChange={() => toggleSelection(dias, setDias, dia)}
              />
              {dia}
            </label>
          ))}
        </div>
      </div>
      <div style={{ width: "80%", marginTop: "16px", textAlign: "center" }}>
        <label><strong>Períodos:</strong></label>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          {opcoesPeriodos.map((periodo) => (
            <label key={periodo} style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={periodos.includes(periodo)}
                onChange={() => toggleSelection(periodos, setPeriodos, periodo)}
              />
              {periodo}
            </label>
          ))}
        </div>
      </div>
      {error && <C.LabelError>{error}</C.LabelError>}
      {success && <C.LabelSuccess>{success}</C.LabelSuccess>}
      <C.Flex gap="8px" width="80%" style={{ justifyContent: "center" }}>
        <C.BaseButton
          onClick={handleSubmit}
          background="#4caf50"
          hoverBackground="#388e3c"
        >
          Criar Funcionário
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

export default Funcionario;
