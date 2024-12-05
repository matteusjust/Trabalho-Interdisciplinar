import { Button, Flex } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import "./index.css";

const RegisterFuncionario = () => {
  const [open, setOpen] = useState(false);
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [dias, setDias] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX"];
  const opcoesPeriodos = ["M", "V"];

  const toggleSelection = (array, setArray, value) => {
    setArray(array.includes(value) ? array.filter((item) => item !== value) : [...array, value]);
  };

  const createFuncionario = async () => {
    try {
    const disponibilidade = { dias, periodos };
      const response = await fetch("http://localhost:8080/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_funcionario: nomeFuncionario,
          id_especialidade: especialidade,
          disponibilidade: JSON.stringify(disponibilidade),
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
    await createFuncionario();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button color="green">Registrar Funcionario</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title>Registrar Funcionario</Dialog.Title>
          <Dialog.Description />
          <form id="funcionarioForm" onSubmit={handleSubmit}>
            <Flex
              justify={"center"}
              align={"center"}
              gap="20px"
              direction={"column"}
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              <input
                type="text"
                placeholder="Nome do Funcionário"
                value={nomeFuncionario}
                onChange={(e) => [
                  setNomeFuncionario(e.target.value),
                ]}
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
                onChange={(e) => [
                  setEspecialidade(e.target.value),
                ]}
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
              <div
                style={{ width: "80%", marginTop: "16px", textAlign: "center" }}
              >
                <label>
                  <strong>Dias da Semana:</strong>
                </label>
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
              <div
                style={{ width: "80%", marginTop: "16px", textAlign: "center" }}
              >
                <label>
                  <strong>Períodos:</strong>
                </label>
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
                        onChange={() =>
                          toggleSelection(periodos, setPeriodos, periodo)
                        }
                      />
                      {periodo}
                    </label>
                  ))}
                </div>
              </div>
            </Flex>
          </form>
          <Flex justify={"end"} gap="20px">
            <Dialog.Close asChild>
              <Button variant="soft">Fechar</Button>
            </Dialog.Close>
            <Button color="green" variant="soft" type="submit" form="funcionarioForm">
              Confirmar
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default RegisterFuncionario;
