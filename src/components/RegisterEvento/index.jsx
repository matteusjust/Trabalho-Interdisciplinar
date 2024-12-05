import { Button, Flex } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import "./index.css";

const RegisterEvento = () => {
  const [open, setOpen] = useState(false);
  const [dataAgendada, setDataAgendada] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [tipoAtendimento, setTipoAtendimento] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [selectedAluno, setSelectedAluno] = useState("");

  const handleSelectChangeAluno = (event) => {
    setSelectedAluno(event.target.value); // Define o id do funcionário selecionado
  };

  const handleSelectChangeFuncionario = (event) => {
    setSelectedFuncionario(event.target.value); // Define o id do funcionário selecionado
  };

  const fetchAlunos = async () => {
    try {
      const response = await fetch("http://localhost:8080/alunos");
      const json = await response.json();
      setAlunos(json);
    } catch (error) {
      console.log("Erro ao carregar alunos:", error);
    }
  };

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/funcionarios");
      const json = await response.json();
      setFuncionarios(json);
    } catch (error) {
      console.log("Erro ao carregar funcionários:", error);
    }
  };

  useEffect(() => {
    fetchAlunos();
    fetchFuncionarios();
  }, []);

  const createAgendamento = async () => {
    try {
      const response = await fetch("http://localhost:8080/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_funcionario: selectedFuncionario,
          id_aluno: selectedAluno,
          data_agendamento: dataAgendada,
          hora_inicio: horaInicio,
          hora_fim: horaFim,
          tipo_atendimento: tipoAtendimento,
        }),
      });

      if (response.ok) {
        setOpen(false);
      } else {
        console.error("Erro ao criar aluno:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAgendamento();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button color="green">Registrar evento</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title>Registrar evento</Dialog.Title>
          <Dialog.Description />
          <form id="eventoForm" onSubmit={handleSubmit}>
            <Flex
              justify={"center"}
              align={"center"}
              gap="20px"
              direction={"column"}
              style={{ marginTop: "30px", marginBottom: "30px" }}
            >
              <select
                id="funcionario"
                value={selectedFuncionario}
                onChange={handleSelectChangeFuncionario}
                style={{
                  width: "74%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione o funcionario</option>
                {funcionarios.map((funcionario) => (
                  <option
                    key={funcionario.id_funcionario}
                    value={funcionario.id_funcionario}
                  >
                    {funcionario.nome_funcionario}
                  </option>
                ))}
              </select>
              <select
                id="aluno"
                value={selectedAluno}
                onChange={handleSelectChangeAluno}
                style={{
                  width: "74%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione o aluno</option>
                {alunos.map((aluno) => (
                  <option key={aluno.id_aluno} value={aluno.id_aluno}>
                    {aluno.nome_aluno}
                  </option>
                ))}
              </select>

              <span>Data</span>
              <input
                type="date"
                placeholder="Data Agendada"
                value={dataAgendada}
                onChange={(e) => [setDataAgendada(e.target.value)]}
                style={{
                  width: "74%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />

              <span>Horario Inicial</span>
              <input
                type="time"
                placeholder="Horário de Início"
                value={horaInicio}
                onChange={(e) => [setHoraInicio(e.target.value)]}
                style={{
                  width: "74%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <span>Horario final</span>
              <input
                type="time"
                placeholder="Horário de Fim"
                value={horaFim}
                onChange={(e) => [setHoraFim(e.target.value)]}
                style={{
                  width: "74%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="Tipo de Atendimento"
                value={tipoAtendimento}
                onChange={(e) => [setTipoAtendimento(e.target.value)]}
                style={{
                  width: "74%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Flex>
          </form>
          <Flex justify={"end"} gap="20px">
            <Dialog.Close asChild>
              <Button variant="soft">Fechar</Button>
            </Dialog.Close>
            <Button
              color="green"
              variant="soft"
              type="submit"
              form="eventoForm"
            >
              Confirmar
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default RegisterEvento;
