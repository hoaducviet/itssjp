import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import {
  addEvents,
  deleteEvent,
  getCheckPoint,
  getEvents,
  updateEvent,
  createTasks,
  getTasks,
  deleteTasks,
} from "../../../../Redux/AppContext/actions";
import {
  Button,
  FormControl,
  FormLabel,
  Editable,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  useToast,
  Select,
  HStack,
  Box,
  EditablePreview,
  EditableInput,
  Flex
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LpTaskCard } from "../../list/component/LpTaskCard";

const CalendarHomePage = () => {
  const DragDropCalendar = withDragAndDrop(Calendar);
  let userEvents = useSelector((store) => store.AppReducer.events);
  const checkPoints = useSelector((store) => store.AppReducer.checkPoint);
  const [checkedUserId, setCheckedUserId] = useState("");

  userEvents?.forEach((item) => {
    item.start = new Date(item.start);
    item.end = new Date(item.end);
  });
  if (userEvents.length > 0) {
    userEvents = userEvents.filter((item) => item.userID === localStorage.getItem("userEmail"));
  }

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [TaskStatus, setTaskStatus] = useState("todo");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedEvent, setSelectedEvent] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [amPm, setAmPm] = useState("AM");
  const [status, setStatus] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (userEvents.length === 0) {
      dispatch(getEvents());
    }
  }, [dispatch, userEvents.length]);


  useEffect(() => {
    checkPoints.length > 0 &&
      checkPoints.map((elem) => {
        if (elem.checkValidate === true) {
          setCheckedUserId(elem.mailID);
        }
      });
  }, [checkPoints.length]);

  useEffect(() => {
    if (checkPoints.length === 0) {
      dispatch(getCheckPoint());
    }
  }, [dispatch, checkPoints.length]);

  const clearAllFormFields = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setShowDeleteBtn(false);
    setAmPm("");
  };

  const handleAddEvent = (newEvent) => {
    console.log("handleAddEvent:", newEvent);
    dispatch(addEvents(newEvent)).then(() => dispatch(getEvents()));
  };

  const handleCreatetask = (taskState) => {
    dispatch(createTasks(taskState)).then(() => dispatch(getEvents()));
  }

  const handleDeleteTask = (id) => {
    dispatch(deleteTasks(id)).then(() => dispatch(getTasks()));
  }

  const handleUpdateEvent = (id, updateEventobj) => {
    console.log(id, updateEventobj);
    if (updateEventobj.title !== "" &&
      updateEventobj.start !== "" &&
      updateEventobj.end !== "" &&
      updateEventobj.start_time !== "" &&
      updateEventobj.end_time !== ""
    ) {
      dispatch(updateEvent(id, updateEventobj)).then(() => dispatch(getEvents()));
    }
    else {
      toast({
        description: "All fields are required !",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    clearAllFormFields();
  };

  const handleDeletingEvent = (id) => {
    dispatch(deleteEvent(id)).then(() => dispatch(getEvents()));
  };

  const onEventResize = (data) => {
    const { event, start, end } = data;
    const { id } = event;
    let newEvent = { ...event, start, end };
    handleUpdateEvent(id, newEvent);
  };

  const onEventDrop = ({ event, start, end }) => {
    const { id } = event;
    let newEvent = { ...event, start, end };
    handleUpdateEvent(id, newEvent);
  };

  const handleSelectEvent = (event) => {
    // console.log("handleSelectEvent:", event);
    setSelectedEvent(event);
    let { start, end } = event;
    start = new Date(start);
    end = new Date(end);

    const startMonth = start.getMonth() + 1 < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1;
    const startDt = start.getDate() + 1 < 10 ? `0${start.getDate()}` : start.getDate();
    const endMonth = end.getMonth() + 1 < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1;
    const endDt = end.getDate() + 1 < 10 ? `0${end.getDate()}` : end.getDate();

    setStartDate(`${start.getFullYear()}-${startMonth}-${startDt}`);
    setEndDate(`${end.getFullYear()}-${endMonth}-${endDt}`);
    setStartTime(`${startTime}${amPm}`);
    setEndTime(`${endTime}${amPm}`);
    setTitle(event.title);
    setOpenModal(true);
    setShowDeleteBtn(true);
  };

  const handleSelectSlot = (event) => {
    setSelectedEvent(undefined);
    const { start, end } = event;
    // console.log("handleSelectSlot:",event);
    const startMonth = start.getMonth() + 1 < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1;
    const startDt = start.getDate() + 1 < 10 ? `0${start.getDate()}` : start.getDate();
    const endMonth = end.getMonth() + 1 < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1;
    const endDt = end.getDate() + 1 < 10 ? `0${end.getDate()}` : end.getDate();

    setStartDate(`${start.getFullYear()}-${startMonth}-${startDt}`);
    setEndDate(`${end.getFullYear()}-${endMonth}-${endDt}`);
    setStartTime(`${startTime}${amPm}`);
    setEndTime(`${endTime}${amPm}`);
    setOpenModal(true);
  };

  const handleSubmitEvent = () => {
    // console.log("Selected event:-", selectedEvent);

    if (selectedEvent.id) {
      console.log(123);
      const id = selectedEvent.id;
      var time1 = selectedEvent.start_time;
      var time2 = selectedEvent.end_time;
      const updateEvent = {
        title: title,
        description: Description,
        task_status: TaskStatus,
        DateStart: startDate,
        DateEnd: endDate,
        TimeStart: startTime,
        TimeEnd: endTime,
        userID: localStorage.getItem("userEmail"),
        isValidate: false,
      };
      handleUpdateEvent(id, updateEvent);
    }
    else {
      console.log(456);

      if (title !== "" && startDate !== "" && endDate !== "" && startTime !== "" && endTime !== "") {
        const newEvent = {
          title: title,
          description: Description,
          task_status: TaskStatus,
          DateStart: startDate,
          DateEnd: endDate,
          TimeStart: startTime,
          TimeEnd: endTime,
          userID: localStorage.getItem("userEmail"),
          isValidate: false,
        };
        handleAddEvent(newEvent);
      }
      else {
        toast({
          description: "All fields are required !",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    }
    setOpenModal(false);
    clearAllFormFields();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const id = selectedEvent.id;
      handleDeletingEvent(id);
      setOpenModal(false);
      clearAllFormFields();
    }
  };

  // const history = useHistory();

  // const handleRedirect = () => {
  //   history.push('/admin/list-task');
  // };

  const generateJsonData = () => {
    const jsonData = {
      title: title,
      description: Description,
      task_status: TaskStatus,
      DateStart: startDate,
      TimeStart: startTime,
      DateEnd: endDate,
      TimeEnd: endTime
    };

    return jsonData;
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Flex width={{ base: "90%", sm: "80%", md: "25%", lg: "25%", xl: "25%" }} gap="15px" marginBottom="20px" >
        <Box width="auto" >
          <Box>
            <Link to="/admin/list-task">
              <Button
                backgroundColor="#422AFB"
                _hover={{ color: "black", backgroundColor: "gray.100" }}
                color="white"
              >
                Show all task
              </Button>

            </Link>
          </Box>
        </Box>
        <Box width="auto">
          <Box>
            <Button
              backgroundColor="#422AFB"
              _hover={{ color: "black", backgroundColor: "gray.100" }}
              color="white"
              onClick={() => setOpenModal(true)}
            >
              Create new task
            </Button>
          </Box>
        </Box>
      </Flex>

      <DragDropCalendar
        events={userEvents}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        resizable
        style={{
          height: "500px",
          width: "100%",
          margin: "0 auto",
          color: "#422AFB"
        }}
      />
      <Modal isOpen={isOpen || openModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setOpenModal(false);
            }}
          />
          <ModalBody padding="5%">
            {/* title  */}

            <FormControl >
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            {/* Description  */}

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Enter description"
                name="Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            {/* Task Status */}
            <FormControl mt={4}>
              <FormLabel>Task Status</FormLabel>
              <Select
                value={TaskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                name="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>

            {/* End Date  */}

            <FormControl mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                name="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                name="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleSubmitEvent()}
            >
              {showDeleteBtn ? "Edit" : "Submit"}
            </Button>

            {showDeleteBtn && (
              <>
                <Button variant="ghost" onClick={onOpen} bg={"red.400"}>
                  Delete
                </Button>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Task
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Bạn có chắc muốn xóa task
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            onClose();
                            handleDeleteEvent();
                          }}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <LpTaskCard
        title={title}
        description={Description}
        task_status={TaskStatus}
        DateStart={startDate}
        TimeStart={startTime}
        DateEnd={endDate}
        TimeEnd={endTime}
      /> */}
    </div>
  );
};

export default CalendarHomePage;