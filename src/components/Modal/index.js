import React from "react";
import { Background, Modalstyle } from "./styles.js"; // Ajuste o caminho conforme necessário
import Formulario from "../../pages/Formulario/index.js";

export default function Modal({ isOpen, onCancel }) {
  if (isOpen) {
    return (
      <Background>
        <Modalstyle>
          <Formulario onCancel={onCancel} />
        </Modalstyle>
      </Background>
    );
  }
  return null;
}
