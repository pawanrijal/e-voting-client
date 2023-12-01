"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/admin/Navbar";
import { CandidateClient } from "./components/client";
import { getAllCandidates } from "@/apis/candidate/getAll";
import { getCandidateStatus } from "@/lib/utils";
import { useRole } from "@/hooks/useRoleStore";

const Candidate = () => {
  const router = useRouter();
  const [candidatesData, setCandidatesData] = useState([]);
  const role = useRole();

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          try {
            const response = await getAllCandidates(token);
            if (response.status === 200) {
              setCandidatesData(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          } catch (err) {
            toast.error("Something went wrong");
            console.log("Candidate error", err);
          }
        }
      }
    };
    fetchData();
  }, []);
  if (role.role != "Admin" && role.role != "") {
    return <>Unauthorized</>;
  }
  const formattedData = candidatesData.map((item: any) => ({
    id: item.id,
    name: item.name,
    status: getCandidateStatus(item.status),
    position: item.position.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CandidateClient data={formattedData} />
        </div>
      </div>
    </>
  );
};

export default Candidate;
