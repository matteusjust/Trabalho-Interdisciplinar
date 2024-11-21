import { useState, React } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Box, Card, Flex, TextField } from "@radix-ui/themes";
import { BaseButton } from "@radix-ui/themes/dist/cjs/components/base-button";
import apaeLogo from "../../img/apae-logo.png";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <Flex justify={"center"} align={"center"} direction={"column"}>
      <img src={apaeLogo} alt="Apae" height={"auto"}></img>
      <Box width={"300px"}>
        <Card size={"4"}>
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={"4"}
          >
            <TextField.Root
              style={{
                width: "100%",
              }}
              placeholder="Insira seu email"
              type="email"
              value={email}
              onChange={(e) => [setEmail(e.target.value), setError("")]}
            ></TextField.Root>
            <TextField.Root
              style={{
                width: "100%",
              }}
              placeholder="Insira sua senha"
              type="password"
              value={senha}
              onChange={(e) => [setSenha(e.target.value), setError("")]}
            ></TextField.Root>
            <C.labelError>{error}</C.labelError>
            <BaseButton
              style={{
                width: "100%",
              }}
              onClick={handleLogin}
            >
              Login
            </BaseButton>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default Signin;