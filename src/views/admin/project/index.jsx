// Chakra imports
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";
import {
  columnsDataDevelopment,
} from "./variables/columnsData";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWorkSpace } from '../../../Redux/AppContext/actions';
export default function Settings() {
  // Lọc ra những dự án có thuộc tính ondelete bằng 0
  // const filteredData = tableDataDevelopment.filter((project) => project.ondelete === 0);
  const dispatch = useDispatch();
  const workSpaceData = useSelector((store) => store.AppReducer.workSpace);
  console.log(workSpaceData);
  useEffect(() => {
    dispatch(getWorkSpace());
  }, [dispatch]);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
        height="80vh"
        width="320vh"
      >
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={workSpaceData} // Truyền dữ liệu đã được lọc
          height="100%"
          width="100%"
        />
      </SimpleGrid>
    </Box>
  );
}
