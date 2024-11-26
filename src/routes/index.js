import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Formulario from "../pages/Formulario"
import useAuth from "../hooks/useAuth";
import { Flex } from "@radix-ui/themes";
import Aluno from "../pages/Aluno";
import Funcionario from "../pages/Funcionario";
const Private = ({ Item }) => {
  const { signed } = useAuth(); //substitua o true po useAuth() para ligar o login

  return signed > 0 ? <Item /> : <Signin />;
};

// Signin

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route exact path="/formulario" element={<Private Item={Formulario} />} />
          <Route exact path="/aluno" element={<Private Item={Aluno} />} />
          <Route exact path="/funcionario" element={<Private Item={Funcionario} />} />
          <Route
            path="/"
            element={
              <Flex justify={"center"} align={"center"} height={"100vh"}>
                <Signin />
              </Flex>
            }
          />
          <Route
            path="*"
            element={
              <Flex justify={"center"} align={"center"} height={"100vh"}>
                <Signin />
              </Flex>
            }
          />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
