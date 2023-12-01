"use client";
import { Avatar } from "@/components/ui/avatar";
import { baseUrl, getInitials } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LeaderboardProps {
  positionId: number;
}

const Leaderboard: FC<LeaderboardProps> = ({ positionId }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  useEffect(() => {
    fetchLeaderboardData();
  }, []);
  const fetchLeaderboardData = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await axios.get(
        `${baseUrl}/position/getCandidateVotes/${positionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLeaderboardData(response.data.data);
    } catch (err: any) {
      toast(err.response.data.message);
    }
  };
  return (
    <div className="space-y-8">
      {leaderboardData.length > 0 &&
        leaderboardData.map((leaderboard: any) => {
          return (
            <div className="flex items-center" key={leaderboard.candidateId}>
              <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                <AvatarFallback>
                  {getInitials(leaderboard.candidateName)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {leaderboard.candidateName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {leaderboard.email}
                </p>
              </div>
              <div className="ml-auto font-medium">{leaderboard.voteCount}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Leaderboard;
