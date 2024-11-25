import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "./styles"; 


const Formulario = ({ onCancel }) => {
  const [date, setDate] = useState("");
  const [eventName, setEventName] = useState(""); 
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSchedule = () => {
    if (!date) {
      setError("Por favor, insira uma data.");
      setSuccess("");
      return;
    }

    if (!eventName) {
      setError("Por favor, insira o nome do evento.");
      setSuccess("");
      return;
    }

    if (!details) {
      setError("Por favor, insira os detalhes da data.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Data marcada com sucesso!");
    console.log("Data marcada:", date, "Evento:", eventName, "Detalhes:", details);
  };

  const handleCancel = () => {
    onCancel(); 
  };

  return (
    <C.Container>
       <C.Title>Adicione uma data</C.Title>
      <input
        type="date"
        placeholder="Selecione uma data"
        value={date}
        onChange={(e) => [setDate(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "50%" }}
      />
      <input
        type="text"
        placeholder="Insira o nome do evento"
        value={eventName}
        onChange={(e) => [setEventName(e.target.value), setError(""), setSuccess("")]}
        style={{ width: "74%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <C.TextArea
        placeholder="Adicione detalhes da data marcada"
        value={details}
        onChange={(e) => [setDetails(e.target.value), setError(""), setSuccess("")]}
      />
      {error && <C.LabelError>{error}</C.LabelError>}
      {success && <C.LabelSuccess>{success}</C.LabelSuccess>}
      <C.Flex gap="8px" width="80%">
        <C.BaseButton
          onClick={handleSchedule}
          background="#4caf50"
          hoverBackground="#388e3c"
        >
          Marcar Data
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
