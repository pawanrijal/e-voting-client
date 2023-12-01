"use client";
import Navbar from "@/components/admin/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRole } from "@/hooks/useRoleStore";
import React, { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";
import axios from "axios";
import { baseUrl } from "@/lib/utils";
import toast from "react-hot-toast";

const Details = ({ params }: { params: { positionId: number } }) => {
  const roleStore = useRole();
  const [positionData, setPositionData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  if (roleStore.role != "Admin" && roleStore.role != "") {
    return <>Unauthorized</>;
  }
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.get(
        `${baseUrl}/position/${params.positionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPositionData(response.data.data);
    } catch (err: any) {
      toast(err.response.data.message);
    }
  };
  return (
    <>
      <Navbar />
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>{positionData?.name}</CardTitle>
          <CardDescription>Voting Leaderboards</CardDescription>
        </CardHeader>
        <CardContent>
          <Leaderboard positionId={params.positionId} />
        </CardContent>
      </Card>
    </>
  );
};

export default Details;
