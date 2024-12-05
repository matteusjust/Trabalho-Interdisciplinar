import React from "react";
import { Container, Content } from "./styles";
import { FaTimes, FaHome, FaPersonBooth, FaTicketAlt } from "react-icons/fa";

import SidebarItem from "../SidebarItem";
import { useNavigate } from "react-router-dom"; // Importa o hook para navegação

const Sidebar = ({ active }) => {
  const navigate = useNavigate(); // Instância do hook useNavigate

  const closeSidebar = () => {
    active(false);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navega para o caminho especificado
    closeSidebar();
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem
          Icon={FaHome}
          Text="Home"
          onClick={() => handleNavigation("/home")}
        />
        <SidebarItem
          Icon={FaPersonBooth}
          Text="Alunos"
          onClick={() => handleNavigation("/alunos")}
        />
        <SidebarItem
          Icon={FaTicketAlt}
          Text="Funcionarios"
          onClick={() => handleNavigation("/funcionarios")}
        />
      </Content>
    </Container>
  );
};

export default Sidebar;
