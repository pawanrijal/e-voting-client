import React from "react";
import MainNav from "./Navbar/MainNav";
import Navbar from "./Navbar";
import { useRole } from "@/hooks/useRoleStore";
import Admin from "../dashboard/Admin";

const AdminDashboard = () => {
  const role = useRole();
  return (
    <>
      <Navbar />
      {role.role === "Admin" ? <Admin /> : <></>}
    </>
  );
};

export default AdminDashboard;
