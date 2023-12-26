/* eslint-disable */
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Avatar,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Box,
  Heading,
  Stack,
  List,
  ListItem,
  ListIcon,
  Badge,
  Button,
} from "@chakra-ui/react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
// Custom components
import React, { useMemo, useEffect, useState } from "react";
import { createTasks, getTasks, getWorkSpace, createWorkSpace } from "../../../../Redux/AppContext/actions";

export default function ViewProject(props) {
  const { columnsData, tableData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpened, setModalOpened] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [taskState, setTaskState] = useState({
    name: "",
    listtask: [],
    member: [],
    date: "",
    progress: 0,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!modalOpened) {
          const data = await getWorkSpace();

          // Kiểm tra nếu dữ liệu không rỗng và có cấu trúc mong đợi
          if (data && Array.isArray(data) && data.length > 0) {
            setTaskState({
              name: data[0].name,
              listtask: Array.isArray(data[0].listtask)
                ? data[0].listtask
                : [],
              member: Array.isArray(data[0].member)
                ? data[0].member
                : [],
              date: data[0].date,
              progress: data[0].progress,
            });

            onOpen();
            setModalOpened(true);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu workspace:", error);
      }
    };


    fetchData();
  }, [modalOpened, onOpen]);


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View WorkSpace</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            {/* name  */}

            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter Name"
                value={taskState.name}
                onChange={(e) => setTaskState({ ...taskState, name: e.target.value })}
              />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>List Task</FormLabel>
              <Input
                placeholder="Enter List Task"
                value={Array.isArray(taskState.listtask) ? taskState.listtask.join(', ') : taskState.listtask}
                onChange={(e) => {
                  console.log("Input Value:", e.target.value);
                  const newList = e.target.value.split(',').map(item => item.trim());
                  console.log("New List:", newList);
                  setTaskState({
                    type: 'listtask',
                    payload: newList
                  });
                }}
              />
            </FormControl>



            <FormControl mt={5}>
              <FormLabel>Member</FormLabel>
              <Input
                placeholder="Nhập Gmail"
                value={Array.isArray(taskState.member) ? taskState.member.join(', ') : taskState.member}
                onChange={(e) => {
                  const newMembers = e.target.value.split(',').map(item => item.trim());
                  setTaskState(prevState => ({ ...prevState, member: newMembers }));
                }}
              />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>End Date</FormLabel>
              <Input
                name="end-date"
                type="date"
                value={taskState.date}
                onChange={(e) => setTaskState({ type: 'date', payload: e.target.value })}
              />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Process</FormLabel>
              <Input
                placeholder="Enter Process"
                value={taskState.progress}
                onChange={(e) => setTaskState({ type: 'progress', payload: parseInt(e.target.value, 10) || 0 })}
              />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>


        </ModalContent>
      </Modal>
    </>
  );
}