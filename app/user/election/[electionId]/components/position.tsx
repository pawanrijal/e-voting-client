"use client";
import { getVotedCandidate } from "@/apis/vote/getVotedCandidate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PositionProps {
  name: string;
  description: string;
  id: number;
}

const Position: FC<PositionProps> = ({ name, description, id }) => {
  const router = useRouter();
  const [candidateData, setCandidateData] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const handleClick = () => {
    router.push(`/user/position/${id}`);
  };
  const getData = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await getVotedCandidate(token!, id);
      setCandidateData(response.data.data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <Card className="hover:bg-slate-200 cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      {candidateData && (
        <CardFooter>
          <p>My Vote: {candidateData?.name}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default Position;
