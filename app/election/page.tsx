"use client";
import React, { useEffect, useState } from "react";
import { ElectionClient } from "./components/client";
import { getAllElections } from "@/apis/election/getAll";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/admin/Navbar";
import { getElectionStatus } from "@/lib/utils";
import { useRole } from "@/hooks/useRoleStore";

const Election = () => {
  const router = useRouter();
  const [electionsData, setElectionsData] = useState([]);
  const roleStore = useRole();
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          try {
            const response = await getAllElections(token);
            if (response.status === 200) {
              setElectionsData(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          } catch (err) {
            toast.error("Something went wrong");
            console.log("Election error", err);
          }
        }
      }
    };
    fetchData();
  }, []);
  if (roleStore.role != "Admin") {
    return <>Unauthorized</>;
  }
  const formattedData = electionsData.map((item: any) => ({
    id: item.id,
    name: item.name,
    createdBy: item.createdBy,
    status: getElectionStatus(item.status),
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
    // updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ElectionClient data={formattedData} />
        </div>
      </div>
    </>
  );
};

export default Election;
