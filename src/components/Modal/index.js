import React from "react";
import { Background, Modalstyle } from "./styles.js"; 
import Formulario from "../../pages/Formulario/index.js";
import Aluno from "../../pages/Aluno/index.js";
import Funcionario from "../../pages/Funcionario/index.js";

export default function Modal({ isOpen, onCancel, page }) {
  const renderPage = () => {
    switch (page) {
      case "Formulario":
        return <Formulario onCancel={onCancel} />;
      case "Aluno":
        return <Aluno onCancel={onCancel} />;
      case "Funcionario":
        return <Funcionario onCancel={onCancel} />;
      default:
        return null;
    }
  };

  if (isOpen) {
    return (
      <Background>
        <Modalstyle>{renderPage()}</Modalstyle>
      </Background>
    );
  }
  return null;
}
