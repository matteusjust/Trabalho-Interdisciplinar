import React from "react";
import Header from "../../components/Header/indes";
import AlunosList from "../../components/AlunosList";
import { Flex } from "@radix-ui/themes";


const AlunosPage = () => {
  
  return (
    <>
      <Header> </Header>
      <div>
        <Flex align={"center"} justify={"center"} style={{marginTop: '10px', marginBottom: '10px'}}>
        <h1>Alunos</h1>
        </Flex>
        <AlunosList />
      </div>
    </>
  );
};


export default AlunosPage;


