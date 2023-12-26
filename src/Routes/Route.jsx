import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdEvent,
  MdHome,
  MdLock,
  MdCheckCircleOutline,
  MdCode
} from "react-icons/md";
import SignIn from '../views/auth/signin/index'
import SignUp from '../views/auth/signup/index'
import MyDashboard from '../views/admin/dashboard/index'
import MyCalendar from "../views/admin/calendar/index"
import CalendarProject from "../views/admin/calendarproject/index"
import MyListTask from "../views/admin/list/index"
import MyProject from "../views/admin/project/index"
const routes = [
  {
    name: "My Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MyDashboard,
  },
  {
    name: "My Calendar ",
    layout: "/admin",
    path: "/calendar",
    icon: <Icon as={MdEvent} width='20px' height='20px' color='inherit' />,
    component: MyCalendar,
  },
  // {
  //   name: "Calendar Project",
  //   layout: "/admin",
  //   path: "/calendarproject",
  //   icon: <Icon as={MdEvent} width='20px' height='20px' color='inherit' />,
  //   component: CalendarProject,
  // },
  {
    name: "My List Task",
    layout: "/admin",
    path: "/list-task",
    icon: <Icon as={MdCheckCircleOutline} width='20px' height='20px' color='inherit' />,
    component: MyListTask,
  },
  {
    name: "My WorkSpace",
    layout: "/admin",
    path: "/project",
    icon: <Icon as={MdCode} width='20px' height='20px' color='inherit' />,
    component: MyProject,
  },

  {
    name: "Sign Out",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignIn,
  },
  {
    layout: "/auth",
    path: "/sign-up",
    component: SignUp,
  },
];

export default routes;
