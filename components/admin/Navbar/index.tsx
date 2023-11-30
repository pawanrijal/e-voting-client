import React, { useEffect } from "react";
import MainNav from "./MainNav";
import { redirect, useRouter } from "next/navigation";
import { UserNav } from "./UserNav";
import { useRole } from "@/hooks/useRoleStore";
import { useAuth } from "@/hooks/useAuthStore";
import { getProfile } from "@/apis/auth/profile";
import toast from "react-hot-toast";

const Navbar = () => {
  const role = useRole();
  const router = useRouter();
  const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          auth.setToken(token);
          try {
            const response = await getProfile(token);
            if (response.status === 200) {
              role.setRole(response.data.data.roleName);
              auth.setUser(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          } catch (err: any) {
            toast.error("Something went wrong");
            console.log("Profile error", err);
            if (err.response.data.message == "jwt expired") {
              router.push("/auth/login");
            }
          }
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
