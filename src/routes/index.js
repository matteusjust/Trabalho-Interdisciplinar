import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import useAuth from "../hooks/useAuth";
import { Flex } from "@radix-ui/themes";
import AlunosPage from "../pages/Alunos";
import Sidebar from "../components/Sidebar"; // Adicionando o Sidebar
import FuncionariosPage from "../pages/Funcionarios";

const Private = ({ Item }) => {
  const { signed } = useAuth(); // Verificando a autenticação

  // Se o usuário estiver autenticado (signed > 0), exibe o componente solicitado
  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página Home (Protegida, com Sidebar) */}
        <Route path="/home" element={<Private Item={Home} />} />

        {/* Página Signin (Pública, sem Sidebar) */}
        <Route
          path="/"
          element={
            <Flex justify={"center"} align={"center"} height={"100vh"}>
              <Signin />
            </Flex>
          }
        />

        {/* Página Alunos (Com Sidebar, somente para usuários autenticados) */}
        <Route
          path="/alunos"
          element={
            <Private
              Item={() => (
                <>
                  <Sidebar /> {/* Sidebar visível */}
                  <AlunosPage /> {/* Página Alunos */}
                </>
              )}
            />
          }
        />

        <Route
          path="/funcionarios"
          element={
            <Private
              Item={() => (
                <>
                  <Sidebar /> {/* Sidebar visível */}
                  <FuncionariosPage /> {/* Página Alunos */}
                </>
              )}
            />
          }
        />


        {/* Página de Not Found (404) */}
        <Route
          path="*"
          element={
            <Flex justify={"center"} align={"center"} height={"100vh"}>
              <Signin />
            </Flex>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
