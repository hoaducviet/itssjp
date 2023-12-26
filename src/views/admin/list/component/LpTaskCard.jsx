import {
    Badge,
    Box,
    Flex,
    Text,
    Stack,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter,
    Select,
    useToast,
    FormControl,
    FormLabel,
    Input,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTasks, getTasks,updateTasks } from "../../../../Redux/AppContext/actions";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {CalendarHomePage} from "../../calendar/component/CalendarHomePage";

const LpTaskCard = ({ id, title, description,task_status, tags, DateStart, DateEnd, TimeStart, TimeEnd, colorScheme }) => {

    const dispatch = useDispatch();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const deleteTaskHandler = (id) => {
        dispatch(deleteTasks(id))
            .then(() => toast({
                title: 'Task deleted !',
                description: "We've deleted your task.",
                status: 'success',
                duration: 1500,
                position: "top",
                isClosable: true,
            }))
            .then(() => dispatch(getTasks()));
    };

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [taskStatus, setTaskStatus] = useState(task_status);
    const [taskTags, setTaskTags] = useState(tags);
    const [taskDateStart,setTaskDateStart] = useState(DateStart);
    const [taskDateEnd,setTaskDateEnd] = useState(DateEnd);
    const [taskTimeStart,setTaskTimeStart] = useState(TimeStart);
    const [taskTimeEnd,setTaskTimeEnd] = useState(TimeEnd);

    const updateFunc = ()=>{
        dispatch(
            updateTasks(id, {
              title: taskTitle,
              description: taskDescription,
              DateStart: taskDateStart,
              DateEnd: taskDateEnd,
              TimeStart: taskTimeStart,
              TimeEnd: taskTimeEnd,
              tags :taskTags,
              task_status: taskStatus,
            })
          ).then(() => dispatch(getTasks()));

    }
    return (
        <Box
            width={{ base: "80%", sm: "90%", md: "90%", lg: "90%", xl: "90%" }}
            margin="auto"
            marginTop="3%"
            marginBottom="3%"
            borderRadius='lg'
            padding="5%"
            backgroundColor="white"
            boxShadow="rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
        >
            <Box>
                <Flex>
                    <Text mt='1'
                         fontWeight='semibold'
                         fontSize="20px"
                         as='h4'
                         lineHeight='tight'
                         noOfLines={1}>{title}
                    </Text>
                </Flex>
            </Box>

            <Box>
                <Stack
                    direction={{ base: "column", sm: "column", md: "column", lg: "row", xl: "row" }}
                    width="fit-content"
                >
                    <Badge fontWeight='bold' fontSize="12px" colorScheme={colorScheme}>{tags}</Badge>
                </Stack>
            </Box>

            <Box>
                <Flex>
                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                    >{description}</Text>
                </Flex>
            </Box>

            <Box>
                <Flex>
                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                    >{DateStart}
                    </Text>

                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                        marginLeft="20px"
                    >{TimeStart}
                    </Text>

                </Flex>
                
            </Box>

            <Box>
                <Flex>
                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                    >{DateEnd}
                    </Text>

                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                        marginLeft="20px"
                    >{TimeEnd}
                    </Text>

                </Flex>
                
            </Box>

            <Box>
                <Flex
                    padding="4%"
                    paddingTop="7%"
                    justifyContent="space-between">
                    <Box color="blue">
                        <EditIcon onClick={onOpen} fontSize="100%" cursor="pointer" />
                    </Box>
                    <Box color="red">
                        <DeleteIcon fontSize="100%" onClick={() => deleteTaskHandler(id)} cursor="pointer" />
                    </Box>
                </Flex>
            </Box>
            
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    {/* title  */}

                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter Title"
                            value={taskTitle}
                            onChange={(e)=>{ setTaskTitle(e.target.value)}}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                            <Input
                                placeholder="Enter description"
                                value={taskDescription}
                                onChange={(e)=>{ setTaskDescription(e.target.value)}}
                                // onChange={(e) => setTaskState({ type: 'description', payload: e.target.value })}
                            />
                    </FormControl>

                    {/* Task Status  */}

                    <Box mb="0.5rem" mt={4}>
                        <FormLabel>Task Status</FormLabel>
                        <Select
                            placeholder="Select Status"
                            value={taskStatus}
                            onChange={(e)=>{ setTaskStatus(e.target.value)}}
                            // onChange={(e) => setTaskState({ type: 'task_status', payload: e.target.value })}
                        >
                            <option value="todo">Todo</option>
                            <option value="progress">Doing</option>
                            <option value="done">Done</option>
                            <option value="overdue">Overdue</option>
                        </Select>
                    </Box>

                    <FormControl mt={4}>
                       <FormLabel>Start Date</FormLabel>
                       <Input
                         name="start-date"
                         type="date"
                         value={taskDateStart}
                         onChange={(e)=>{ setTaskDateStart(e.target.value)}}
                        //  onChange={(e) => setTaskState({ type: 'DateStart', payload: e.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                       <FormLabel>Start Time</FormLabel>
                       <Input
                         name="start-time"
                         type="time"
                         value={taskTimeStart}
                         onChange={(e)=>{ setTaskTimeStart(e.target.value)}}
                        //  onChange={(e) => setTaskState({ type: 'DateStart', payload: e.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                       <FormLabel>End Date</FormLabel>
                       <Input
                         name="end-date"
                         type="date"
                         value={taskDateEnd}
                         onChange={(e)=>{ setTaskDateEnd(e.target.value)}}
                        //  onChange={(e) => setTaskState({ type: 'Date', payload: e.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                       <FormLabel>End Time</FormLabel>
                       <Input
                         name="end-time"
                         type="time"
                         value={taskTimeEnd}
                         onChange={(e)=>{ setTaskTimeEnd(e.target.value)}}
                        //  onChange={(e) => setTaskState({ type: 'Date', payload: e.target.value })}
                        />
                    </FormControl>

                    {/* Tags  */}

                    <Box mb="0.5rem" mt={4}>
                        <FormLabel>Select Tags</FormLabel>
                        <Select
                            placeholder="Select Tags"
                            value={taskTags}
                            onChange={(e)=>{ setTaskTags(e.target.value)}}
                            // onChange={(e) => setTaskState({ type: 'tags', payload: e.target.value })}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Teams">Teams</option>
                        </Select>
                    </Box>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={updateFunc}>Update Task</Button>
                </ModalFooter>

            </ModalContent>
            </Modal>

            
        </Box>
    );
};

export { LpTaskCard };
