"use client";
import { findElectionById } from "@/apis/election/findById";
import Navbar from "@/components/admin/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PositionForm } from "./components/position-form";
import { findPositionById } from "@/apis/position/findById";
import { useRole } from "@/hooks/useRoleStore";

const PositionPage = ({ params }: { params: { positionId: number } }) => {
  const router = useRouter();
  const [electionData, setElectionData] = useState(null);
  const [token, setToken] = useState("");
  const roleStore = useRole();
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          setToken(token);
          try {
            const response = await findPositionById(token, params.positionId);
            if (response.status === 200) {
              setElectionData(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          } catch (err) {
            // toast.error("Something went wrong");
            console.log("Election error", err);
          }
        }
      }
    };
    fetchData();
  }, []);
  if (roleStore.role != "Admin" && roleStore.role != "") {
    return <>Unauthorized</>;
  }
  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <PositionForm initialData={electionData} token={token} />
        </div>
      </div>
    </>
  );
};
export default PositionPage;
