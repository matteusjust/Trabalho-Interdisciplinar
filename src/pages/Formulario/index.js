import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "./styles";

const Formulario = ({ onCancel }) => {
  const [dataAgendada, setDataAgendada] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [tipoAtendimento, setTipoAtendimento] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSchedule = async () => {
    if (!dataAgendada || !horaInicio || !horaFim || !tipoAtendimento) {
      setError("Por favor, preencha todos os campos.");
      setSuccess("");
      return;
    }

    const agendamento = {
      data_agendamento: dataAgendada,
      hora_inicio: horaInicio,
      hora_fim: horaFim,
      tipo_atendimento: tipoAtendimento,
    };

    try {
      const response = await fetch("http://localhost:3000/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agendamento),
      });

      if (response.ok) {
        setError("");
        setSuccess("Agendamento realizado com sucesso!");
        console.log("Agendamento enviado:", agendamento);
        // Limpar os campos após sucesso
        setDataAgendada("");
        setHoraInicio("");
        setHoraFim("");
        setTipoAtendimento("");
      } else {
        setError("Erro ao realizar o agendamento. Tente novamente.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Erro ao enviar agendamento:", error);
      setError("Erro ao conectar-se ao servidor.");
      setSuccess("");
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <C.Container>
      <C.Title>Marque uma Data</C.Title>
      <input
        type="date"
        placeholder="Data Agendada"
        value={dataAgendada}
        onChange={(e) => [setDataAgendada(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "50%" }}
      />
      <input
        type="time"
        placeholder="Horário de Início"
        value={horaInicio}
        onChange={(e) => [setHoraInicio(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "50%" }}
      />
      <input
        type="time"
        placeholder="Horário de Fim"
        value={horaFim}
        onChange={(e) => [setHoraFim(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "50%" }}
      />
      <input
        type="text"
        placeholder="Tipo de Atendimento"
        value={tipoAtendimento}
        onChange={(e) => [setTipoAtendimento(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "74%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      {error && <C.LabelError>{error}</C.LabelError>}
      {success && <C.LabelSuccess>{success}</C.LabelSuccess>}
      <C.Flex gap="8px" width="80%">
        <C.BaseButton
          onClick={handleSchedule}
          background="#4caf50"
          hoverBackground="#388e3c"
        >
          Confirmar Agendamento
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

export default Formulario;
