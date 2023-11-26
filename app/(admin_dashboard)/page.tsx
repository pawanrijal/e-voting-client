"use client";
import { getProfile } from "@/apis/auth/profile";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useAuth } from "@/hooks/useAuthStore";
import { useRole } from "@/hooks/useRoleStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const auth = useAuth();
  const role = useRole();
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          setLoggedIn(true);
          auth.setToken(token);
          try {
            const response = await getProfile(token);
            if (response.status === 200) {
              setUserRole(response.data.data.roleName);
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
  if (!loggedIn) {
    return <></>;
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
