import { Button, Flex } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import "./index.css";

const RegisterAluno = () => {
  const [open, setOpen] = useState(false);
  const [nomeAluno, setNomeAluno] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [contatoResponsavel, setContatoResponsavel] = useState("");
  const [diagnostico, setDiagnostico] = useState("");

  const createAluno = async () => {
    try {
      const response = await fetch("http://localhost:8080/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_aluno: nomeAluno,
          data_nascimento: dataNascimento,
          contato_responsavel: contatoResponsavel,
          matricula: matricula,
          diagnostico: diagnostico,
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
    await createAluno(); 
  };


  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button color="green">Registrar aluno</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title>Registrar aluno</Dialog.Title>
          <Dialog.Description />
          <form
            id="alunoForm" onSubmit={handleSubmit}
          >
            <Flex
              justify={"center"}
              align={"center"}
              gap="20px"
              direction={"column"}
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              <input
                type="text"
                placeholder="Nome do Aluno"
                onChange={(e) => [setNomeAluno(e.target.value)]}
                style={{
                  width: "80%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="date"
                placeholder="Data de Nascimento"
                onChange={(e) => [setDataNascimento(e.target.value)]}
                style={{
                  width: "80%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                title="Selecione a data de nascimento do aluno"
              />
              <input
                type="text"
                placeholder="Matrícula"
                onChange={(e) => [setMatricula(e.target.value)]}
                style={{
                  width: "80%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="Contato do Responsável"
                onChange={(e) => [setContatoResponsavel(e.target.value)]}
                style={{
                  width: "80%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder="Diagnostico"
                style={{ width: "350px", height: "150px" }}
                onChange={(e) => setDiagnostico(e.target.value)}
              ></textarea>
            </Flex>
          </form>
          <Flex justify={"end"} gap="20px">
            <Dialog.Close asChild>
              <Button variant="soft">Fechar</Button>
            </Dialog.Close>
            <Button color="green" variant="soft" type="submit" form="alunoForm">
              Confirmar
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default RegisterAluno;
