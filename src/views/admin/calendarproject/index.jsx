import React, { useState, useEffect } from "react";
import {
    Box,
  } from "@chakra-ui/react";
import CalendarHomePage from "../calendarproject/component/CalendarHomePage"
export default function CalendarProject(){
    return (
        <>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <CalendarHomePage/>
        </Box>      
        </>
    )
}