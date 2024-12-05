import { Button, Card, Container, DropdownMenu } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import RegisterAluno from "../RegisterAluno";

const AlunosList = () => {
  const [alunos, setAlunos] = useState([]);

  const fetchAlunos = async () => {
    try {
      const response = await fetch("http://localhost:8080/alunos");
      const json = await response.json();
      setAlunos(json);
    } catch (error) {
      console.log("Erro ao carregar alunos:", error);
    }
  };

  const excluirAluno = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/alunos/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchAlunos();
      } else {
        console.error("Erro ao excluir aluno");
      }
    } catch (error) {
      console.log("Erro na exclusão:", error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []); 

  return (
    <Container>
      <RegisterAluno></RegisterAluno>
      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Data Nascimento</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Matricula</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Contato Responsavel
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Diagnostico</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {alunos.map((aluno, index) => (
              <Table.Row key={index}>
                <Table.Cell>{aluno.nome_aluno}</Table.Cell>
                <Table.Cell>
                  {dayjs(aluno.data_nascimento).format("DD/MM/YYYY")}
                </Table.Cell>
                <Table.Cell>{aluno.matricula}</Table.Cell>
                <Table.Cell>{aluno.contato_responsavel}</Table.Cell>
                <Table.Cell>{aluno.diagnostico}</Table.Cell>
                <Table.Cell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft">
                        Ações
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item color="red" onClick={() => excluirAluno(aluno.id_aluno)}>Excluir</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Container>
  );
};
export default AlunosList;
