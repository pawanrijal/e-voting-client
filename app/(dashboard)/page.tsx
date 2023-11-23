"use client";
import { getProfile } from "@/apis/auth/profile";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useAuth } from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const auth = useAuth();
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
            } else {
              toast.error(response.data.message);
            }
          } catch (err) {
            toast.error("Something went wrong");
            console.log("Profile error", err);
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
      {userRole === "Admin" ? <AdminDashboard /> : <div>User Dashboard</div>}
    </div>
  );
}
