import { Button, Card, Container, DropdownMenu } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import RegisterFuncionario from "../RegisterFuncionario";

const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const obj = {
    M: "Matutino",
    V: "Verspertino",
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

  const excluirFuncionario = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/funcionarios/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchFuncionarios();
      } else {
        console.error("Erro ao excluir funcionário");
      }
    } catch (error) {
      console.log("Erro na exclusão:", error);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  return (
    <Container>
      <RegisterFuncionario />
      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Codigo</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Especialidade</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Dias Disponiveis</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Periodos Disponiveis
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {funcionarios.map((funcionario, index) => (
              <Table.Row key={index}>
                <Table.Cell>{funcionario.id_funcionario}</Table.Cell>
                <Table.Cell>{funcionario.nome_funcionario}</Table.Cell>
                <Table.Cell>{funcionario.nome_especialidade}</Table.Cell>
                <Table.Cell>
                  {funcionario.disponibilidade.dias.join(", ")}
                </Table.Cell>
                <Table.Cell>{`${
                  obj[funcionario.disponibilidade.periodos[0]]
                } - ${
                  obj[
                    funcionario.disponibilidade.periodos[
                      funcionario.disponibilidade.periodos.length - 1
                    ]
                  ]
                }`}</Table.Cell>
                <Table.Cell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft">
                        Ações
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item
                        color="red"
                        onClick={() =>
                          excluirFuncionario(funcionario.id_funcionario)
                        }
                      >
                        Excluir
                      </DropdownMenu.Item>
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
export default FuncionariosList;
