import React from "react";
import Header from "../../components/Header/indes";
import { Flex } from "@radix-ui/themes";
import FuncionariosList from "../../components/FuncionariosLIst";


const FuncionariosPage = () => {

  return (
    <>
      <Header> </Header>
      <div>
        <Flex align={"center"} justify={"center"} style={{marginTop: '10px', marginBottom: '10px'}}>
        <h1>Funcionarios</h1>
        </Flex>
        <FuncionariosList  />
      </div>
    </>
  );
};


export default FuncionariosPage;


