import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    Menu,
    MenuButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    MenuList,
    MenuOptionGroup,
    ModalFooter,
    MenuItemOption,
    useToast
} from "@chakra-ui/react";
import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import { createTasks, getTasks, addEvents, getEvents } from "../../../../Redux/AppContext/actions";

const initialTaskState = {
    title: "",
    description: "",
    task_status: "todo",
    tags: ["Teams"],
    DateStart: "",
    DateEnd: "",
    TimeStart: "",
    TimeEnd: "",
    userID: "",
    isValidate: false,
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'title':
            return {
                ...state,
                title: action.payload,
            };

        case 'description':
            return {
                ...state,
                description: action.payload,
            };

        case 'task_status':
            return {
                ...state,
                task_status: action.payload,
            };

        case 'tags':
            return {
                ...state,
                tags: action.payload,
            };

        case 'DateStart':
            return {
                ...state,
                DateStart: action.payload,
            };

        case 'DateEnd':
            return {
                ...state,
                DateEnd: action.payload,
            };

        case 'TimeStart':
            return {
                ...state,
                TimeStart: action.payload,
            };

        case 'TimeEnd':
            return {
                ...state,
                TimeEnd: action.payload,
            };
        case 'userID':
            return {
                ...state,
                userID: action.payload,
            };
        default:
            return state;
    };
};

const LpCreateTask = ({ isOpen, onClose }) => {

    const [taskState, setTaskState] = useReducer(taskReducer, initialTaskState);
    const tagList = useSelector((state) => state.AppReducer.tags);
    const tasks = useSelector((store) => store.AppReducer.tasks);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useHistory();
    const toast = useToast();
    if (taskState.userID === "") {
        setTaskState({ type: 'userID', payload: localStorage.getItem("userEmail") });
    }

    const handleAddEvent = (newEvent) => {
        // console.log("handleAddEvent:", newEvent);
        dispatch(addEvents(newEvent)).then(() => dispatch(getEvents()));
    };

    const createTaskHandler = () => {
        if (taskState.title !== "" &&
            taskState.description !== "" &&
            taskState.taskStatus !== "" &&
            taskState.DateStart !== "" &&
            taskState.TimeStart !== "" &&
            taskState.DateEnd !== "" &&
            taskState.TimeEnd !== "") {

            console.log("taskState:", taskState);
            dispatch(createTasks(taskState))
                .then(() => dispatch(getTasks()))
                .then(() => toast({
                    title: 'Task Created.',
                    description: "We've created your task for you.",
                    status: 'success',
                    duration: 2000,
                    position: "top",
                    isClosable: true,
                }))
                .then(() => {
                    if (location.pathname !== "//#/admin/list-task") {
                        navigate.push("/admin/list-task");
                        onClose()
                    }
                    else {
                        navigate.push("/admin/list-task");
                        onClose()
                    };
                    // onClose()
                });
        }
        else {
            toast({
                title: 'All fields are not there!.',
                description: "Please enter all the fileds.",
                status: 'warning',
                duration: 2000,
                position: "top",
                isClosable: true,
            })
        }
        dispatch(getTasks())
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    {/* title  */}

                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter Title"
                            value={taskState.title}
                            onChange={(e) => setTaskState({ type: 'title', payload: e.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input
                            placeholder="Enter description"
                            value={taskState.description}
                            onChange={(e) => setTaskState({ type: 'description', payload: e.target.value })}
                        />
                    </FormControl>

                    {/* Task Status */}
                    <FormControl mt={4}>
                        <FormLabel>Task Status</FormLabel>
                        <Select
                            value={taskState.taskStatus}
                            onChange={(e) => setTaskState({ type: 'taskStatus', payload: e.target.value })}
                        >
                            <option value="todo">To Do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                            <option value="overdue">Overdue</option>
                        </Select>
                    </FormControl>

                    {/* Start Date  */}

                    <FormControl mt={4}>
                        <FormLabel>Start Date</FormLabel>
                        <Input
                            name="start-date"
                            type="date"
                            value={taskState.DateStart}
                            onChange={(e) => setTaskState({ type: 'DateStart', payload: e.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                            name="start-time"
                            type="time"
                            value={taskState.TimeStart}
                            onChange={(e) => setTaskState({ type: 'TimeStart', payload: e.target.value })}
                        />
                    </FormControl>

                    {/* End Date  */}

                    <FormControl mt={4}>
                        <FormLabel>End Date</FormLabel>
                        <Input
                            name="end-date"
                            type="date"
                            value={taskState.DateEnd}
                            onChange={(e) => setTaskState({ type: 'DateEnd', payload: e.target.value })}
                        />
                    </FormControl>


                    <FormControl mt={4}>
                        <FormLabel>End Time</FormLabel>
                        <Input
                            name="end-time"
                            type="time"
                            value={taskState.TimeEnd}
                            onChange={(e) => setTaskState({ type: 'TimeEnd', payload: e.target.value })}
                        />
                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' onClick={createTaskHandler}>Create Task</Button>
                </ModalFooter>

            </ModalContent>
        </Modal >
    )
};

export { LpCreateTask };
