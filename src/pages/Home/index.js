import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import Header from "../../components/Header/indes";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@radix-ui/themes";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
require('globalize/lib/cultures/globalize.culture.fr');

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);

  return (
    <>
      <Header />
      <Box>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          style={{
            height: "100vh",
          }}
          culture="pt-br"
        />
      </Box>
    </>
  );
};

export default Home;
