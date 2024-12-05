import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import Header from "../../components/Header/indes";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Flex } from "@radix-ui/themes";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import RegisterEvento from "../../components/RegisterEvento";
require('globalize/lib/cultures/globalize.culture.fr');

const Home = () => {
  const [agendamentos, setAgendamentos] = useState([])
  const [events, setEvents] = useState([]);
  const { signout } = useAuth();
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);


  const getAgendamentos = async () => {
    try {
      const response = await fetch("http://localhost:8080/agendamentos");
      const json = await response.json();
      setAgendamentos(json);
    } catch (error) {
      console.log("Erro ao carregar agendamentos:", error);
    }
  }

  const parseAgendamentos = (agendamentos) => {
      return agendamentos.map(agendamento => {
        const { data_agendamento, hora_inicio, hora_fim, tipo_atendimento } = agendamento

      
        const data = data_agendamento.split('T')[0];
        const start = new Date(`${data}T${hora_inicio}`);
        const end = new Date(`${data}T${hora_fim}`);

        const title = `${tipo_atendimento} - Aluno ID: ${agendamento.id_aluno}`;

        return {
          id: agendamento.id_agendamento,
          start,
          end,
          title
        };
      })
  }

  useEffect(() => {
    getAgendamentos();
  }, [])
  
  useEffect(() => {
    const convertedEvents = parseAgendamentos(agendamentos);
    setEvents(convertedEvents);
  }, [agendamentos]);

  return (
    <>
      <Header />
      <Flex align={"center"} justify={"center"} style={{marginTop: "30px", height: "70vh"}} direction={"column"}>
        <RegisterEvento />
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          style={{
            width: "80%"
          }}
          events={events}
          culture="pt-br"
        />
      </Flex>
    </>
  );
};

export default Home;
