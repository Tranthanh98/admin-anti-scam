/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import PostManagement from "views/PostManagement";
import UserProfile from "views/UserProfile/UserProfile.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Quản lý bài đăng",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: PostManagement,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Quản lý user",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
