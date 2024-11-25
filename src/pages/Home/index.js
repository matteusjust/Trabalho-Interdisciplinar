import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/indes";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@radix-ui/themes";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Flex } from "@radix-ui/themes";
import Modal from "../../components/Modal";

require('globalize/lib/cultures/globalize.culture.fr');

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);



  const [open, setOpen] = useState(false);

   
   const onCancel = () => {
    setOpen(false); 
  };

  return (
    <>
      <Header />
      <Flex justify="center" align="center" marginBottom="50px">
        <Button onClick={() => setOpen(!open)}>Ir para Formulário</Button>
      </Flex>
      <Box>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          style={{
            height: "80vh",
          }}
          culture="pt-br"
        />
      </Box>
      <Modal isOpen={open} onCancel={onCancel} />
    </>
  );
};

export default Home;
