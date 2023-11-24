"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/admin/Navbar";
import { getAllPositions } from "@/apis/position/getAll";
import { PositionClient } from "./components/client";

const Position = () => {
  const router = useRouter();
  const [positionsData, setPositionsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          try {
            const response = await getAllPositions(token);
            if (response.status === 200) {
              setPositionsData(response.data.data);
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
  const formattedData = positionsData.map((item: any) => ({
    id: item.id,
    name: item.name,
    election: item.election,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <PositionClient data={formattedData} />
        </div>
      </div>
    </>
  );
};

export default Position;
