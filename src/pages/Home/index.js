import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/indes";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@radix-ui/themes";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Flex } from "@radix-ui/themes";
import Modal from "../../components/Modal";
import * as C from "./styles"; 

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
      <Flex justify="center" align="center" marginBottom="50px" >
        <C.BaseButton
          onClick={() => setOpen(!open)}
          background="#4caf50"
          hoverBackground="#388e3c"
        >Marcar uma Data</C.BaseButton>
      </Flex>
      <Box 
      style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px", 
      marginLeft: "70px",
      height: "100vh",
  }}>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          style={{
            height: "80vh",
            width: "95%", 
          }}
          culture="pt-br"
        />
      </Box>
      <Modal isOpen={open} onCancel={onCancel} />
    </>
  );
};

export default Home;
