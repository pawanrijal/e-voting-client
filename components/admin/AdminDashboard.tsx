import React from "react";
import MainNav from "./Navbar/MainNav";
import Navbar from "./Navbar";
import { useRole } from "@/hooks/useRoleStore";

const AdminDashboard = () => {
  const role = useRole();
  return (
    <>
      <Navbar />
      {role.role} Dashboard
    </>
  );
};

export default AdminDashboard;
