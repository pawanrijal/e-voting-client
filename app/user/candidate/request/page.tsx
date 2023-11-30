"use client";
import Navbar from "@/components/admin/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRole } from "@/hooks/useRoleStore";
import { findCandidateById } from "@/apis/candidate/findById";
import { RequestForm } from "./components/request-form";
import { getAllPositions } from "@/apis/position/getAll";

const RequestPage = ({ params }: { params: { candidateId: number } }) => {
  const router = useRouter();

  const [token, setToken] = useState("");
  const roleStore = useRole();
  const [positionData, setPositionData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          setToken(token);
          try {
            const response = await getAllPositions(token);
            if (response.status === 200) {
              setPositionData(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          } catch (err) {
            toast.error("Something went wrong");
            console.log("Request error", err);
          }
        }
      }
    };
    fetchData();
  }, []);
  if (roleStore.role != "User" && roleStore.role != "") {
    return <>Unauthorized</>;
  }
  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <RequestForm token={token} />
        </div>
      </div>
    </>
  );
};
export default RequestPage;
