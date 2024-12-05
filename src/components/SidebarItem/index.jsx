import React from 'react';
import { Container } from './styles';

const SidebarItem = ({ Icon, Text, onClick }) => {
  return (
    <Container onClick={onClick}> {/* Adiciona o onClick para disparar a navegação */}
      <Icon />
      {Text}
    </Container>
  );
};

export default SidebarItem;