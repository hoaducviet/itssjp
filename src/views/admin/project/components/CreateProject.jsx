import { ChevronDownIcon } from "@chakra-ui/icons";
import { CheckboxGroup, Checkbox } from "@chakra-ui/react";
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
import { createTasks, getTasks, getWorkSpace, createWorkSpace } from "../../../../Redux/AppContext/actions";

const initialTaskState = {
    name: "",
    listtask: [],
    member: [],
    date: "",
    // priority: "High",
    progress: 0,
    // status: "Private",
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                name: action.payload,
            };

        case 'listtask':
            return {
                ...state,
                listtask: action.payload,
            };

        case 'member':
            return {
                ...state,
                member: action.payload,
            };

        case 'date':
            return {
                ...state,
                date: action.payload,
            };
        // case 'priority':
        //     return {
        //         ...state,
        //         priority: action.payload,
        //     };

        case 'progress':
            return {
                ...state,
                progress: action.payload,
            };

        // case 'status':
        //     return {
        //         ...state,
        //         status: action.payload,
        //     };

        default:
            return state;
    };
};

const CreateProject = ({ isOpen, onClose }) => {

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


    const createTaskHandler = () => {
        if (taskState.name !== "" &&
            taskState.listtask.length !== 0 &&
            taskState.member.length !== 0 &&
            taskState.date !== "" &&
            // taskState.priority !== "" &&
            // taskState.status !== "",
            taskState.progress !== 0) {

            console.log(taskState);

            dispatch(createWorkSpace(taskState))
                .then(() => dispatch(getWorkSpace()))
                .then(() => toast({
                    name: 'WorkSpace Created.',
                    description: "We've created your workspace for you.",
                    status: 'success',
                    duration: 2000,
                    position: "top",
                    isClosable: true,
                }))
                .then(() => {
                    if (location.pathname !== "//#/admin/project") {
                        navigate.push("/admin/project");
                        onClose()
                    }
                    else {
                        navigate.push("/admin/list-project");
                        onClose()
                    };
                    // onClose()
                });
        }
        else {
            toast({
                name: 'All fields are not there!.',
                description: "Please enter all the fileds.",
                status: 'warning',
                duration: 2000,
                position: "top",
                isClosable: true,
            })
        }
        dispatch(getWorkSpace())
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create WorkSpace</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    {/* name  */}

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Enter Name"
                            value={taskState.name}
                            onChange={(e) => setTaskState({ type: 'name', payload: e.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>List Task</FormLabel>
                        <Input
                            placeholder="Enter List Task"
                            value={taskState.listtask.join(', ')}
                            onChange={(e) => setTaskState({
                                type: 'listtask',
                                payload: e.target.value.split(',').map(item => item.trim())
                            })} />
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>Add Member</FormLabel>
                        <Input
                            placeholder="Enter Gmail"
                            value={taskState.member.join(', ')}
                            onChange={(e) => setTaskState({
                                type: 'member',
                                payload: e.target.value.split(',').map(item => item.trim()) // Convert input string to array
                            })}
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

                    {/* PRIORITY */}

                    {/* <Box mb="0.5rem" mt={5}>
                        <FormLabel>Priority</FormLabel>
                        <Select
                            placeholder="Select Priority"
                            value={taskState.priority}
                            onChange={(e) => setTaskState({ type: 'priority', payload: e.target.value })}
                        >
                            <option value="todo">High</option>
                            <option value="progress">Medium</option>
                            <option value="done">Low</option>
                        </Select>
                    </Box> */}

                    {/* Tags  */}

                    {/* <Box mb="0.5rem" mt={5}>
                        <FormLabel>Status</FormLabel>
                        <Select
                            placeholder="Select Status"
                            value={taskState.status}
                            onChange={(e) => setTaskState({ type: 'status', payload: e.target.value })}
                        >
                            <option value="todo">Private</option>
                            <option value="doing">Public</option>

                        </Select>
                    </Box> */}

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={createTaskHandler}>Create</Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
};

export { CreateProject };
