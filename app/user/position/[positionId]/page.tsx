"use client";
import { findElectionById } from "@/apis/election/findById";
import Navbar from "@/components/admin/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRole } from "@/hooks/useRoleStore";
import { Separator } from "@/components/ui/separator";
import Candidate from "./components/candidate";
import { findPositionById } from "@/apis/position/findById";
import { Button } from "@/components/ui/button";
import { useCandidate } from "@/hooks/useCandidateStore";
import axios from "axios";
import { baseUrl } from "@/lib/utils";
import { getVotedCandidate } from "@/apis/vote/getVotedCandidate";

const ElectionPage = ({ params }: { params: { positionId: number } }) => {
  const router = useRouter();
  const [positionData, setPositionData] = useState(null);
  const [candidateData, setCandidateData] = useState([]);
  const [votedCandidateData, setVotedCandidateData] = useState(null);
  const [token, setToken] = useState("");
  const roleStore = useRole();
  const candidateStore = useCandidate();
  const [selectedId, setSelectedId] = useState(null);

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
              setPositionData(response.data.data);
              const filteredCandidate = response.data.data.candidates.filter(
                (candidate: any) => {
                  return candidate.status === 1;
                }
              );
              setCandidateData(filteredCandidate);
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
  useEffect(() => {
    getData();
  }, []);

  if (roleStore.role != "User" && roleStore.role != "") {
    return <>Unauthorized</>;
  }
  const handleVote = async () => {
    try {
      await axios.post(
        `${baseUrl}/vote-candidate`,
        { candidateId: selectedId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Voted");
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
  const getData = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await getVotedCandidate(token!, params.positionId);
      setVotedCandidateData(response.data.data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Candidates Included in {positionData?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {votedCandidateData
                ? `My right candidate is ${votedCandidateData?.name}`
                : " Please choose the right candidate"}
            </p>
          </div>
          <Separator className="my-4" />
          <div className="md:grid grid-cols-3 gap-4">
            {candidateData.map((candidate: any) => (
              <Candidate
                id={candidate.id}
                key={candidate.id}
                name={candidate.name}
                description={candidate.manifesto}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ))}
          </div>
          <div className="mx-3 py-4">
            <Button onClick={handleVote} disabled={selectedId == null}>
              Vote {candidateStore.selectedVoter}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ElectionPage;
