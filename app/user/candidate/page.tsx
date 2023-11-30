"use client";
import { getAllCandidates } from "@/apis/candidate/getAll";
import Navbar from "@/components/admin/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CandidateClient } from "./components/client";
import { getCandidateStatus } from "@/lib/utils";

const CandidatePage = () => {
  const router = useRouter();
  const [candidatesData, setCandidatesData] = useState([]);
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
  const formattedData = candidatesData.map((item: any) => ({
    id: item.id,
    //   name: item.name,
    status: getCandidateStatus(item.status),
    position: item.position.name,
  }));
  return (
    <div>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CandidateClient data={formattedData} />
        </div>
      </div>
    </div>
  );
};

export default CandidatePage;
