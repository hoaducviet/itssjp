import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import {
  MdOutlineMoreHoriz,
  MdRemoveRedEye,
  MdEditNote,
  MdDelete,
  MdEditCalendar,
} from "react-icons/md";

import Modal from "../../views/admin/project/components/ViewProject";
import { EditProject } from "../../views/admin/project/components/EditProject";
import CalendarProject from "../../views/admin/project/components/CalendarProject"

export default function Banner(props) {
  const { ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isCalendarOpen, onOpen: onCalendarOpen, onClose: onCalendarClose } = useDisclosure();


  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const [editModalKey, setEditModalKey] = useState(0);
  const [viewModalKey, setViewModalKey] = useState(0);
  const [calendarModalKey, setCalendarModalKey] = useState(0);

  const openViewModal = () => {
    setViewModalKey((prevKey) => prevKey + 1);
    onViewOpen();
  };

  const closeViewModal = () => {
    setViewModalKey((prevKey) => prevKey + 1);
    onViewClose();
  };

  const openCalendarModal = () => {
    setCalendarModalKey((prevKey) => prevKey + 1);
    onCalendarOpen();
  };

  const closeCalendarModal = () => {
    setViewModalKey((prevKey) => prevKey + 1);
    onCalendarClose();
  };

  const openEditModal = () => {
    setEditModalKey((prevKey) => prevKey + 1);
    onEditOpen();
  };

  const closeEditModal = () => {
    setEditModalKey((prevKey) => prevKey + 1);
    onEditClose();
  };

  const handleDelete = () => {
    // Thực hiện xóa dự án ở đây
    // Sau khi xóa, đóng hộp thoại
    closeDeleteDialog();
  };

  return (
    <>
      <Menu isOpen={isOpen1} onClose={onClose1}>
        <MenuButton
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          onClick={onOpen1}
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
        </MenuButton>
        <MenuList
          w="150px"
          minW="unset"
          maxW="150px !important"
          border="transparent"
          backdropFilter="blur(63px)"
          bg={bgList}
          boxShadow={bgShadow}
          borderRadius="20px"
          p="15px"
        >
          <MenuItem
            transition="0.2s linear"
            color="blue"
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={openViewModal}
          >
            <Flex align="center">
              <Icon as={MdRemoveRedEye} color="blue" h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                View
              </Text>
            </Flex>
          </MenuItem>

          <MenuItem
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            color="green"
            _hover={textHover}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={openEditModal}
          >
            <Flex align="center">
              <Icon as={MdEditNote} color="green" h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Edit
              </Text>
            </Flex>
          </MenuItem>

          <MenuItem
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            color="red"
            _hover={textHover}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={openDeleteDialog}
          >
            <Flex align="center">
              <Icon as={MdDelete} color="red" h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Delete
              </Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>

      {isEditOpen && <EditProject isOpen={isEditOpen} onClose={closeEditModal} key={editModalKey} />}
      {isViewOpen && <Modal isOpen={isViewOpen} onClose={closeViewModal} key={viewModalKey} />}
      {isCalendarOpen && <CalendarProject isOpen={isCalendarOpen} onClose={closeCalendarModal} key={calendarModalKey} />}

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={undefined}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this project?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={closeDeleteDialog}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
