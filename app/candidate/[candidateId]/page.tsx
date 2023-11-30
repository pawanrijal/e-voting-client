"use client";
import Navbar from "@/components/admin/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { findPositionById } from "@/apis/position/findById";
import { Heading } from "@/components/ui/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findCandidateById } from "@/apis/candidate/findById";
import { baseUrl, getCandidateStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRole } from "@/hooks/useRoleStore";

const CandidatePage = ({ params }: { params: { candidateId: number } }) => {
  const router = useRouter();
  const [candidateData, setCandidateData] = useState({});
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
            const response = await findCandidateById(token, params.candidateId);
            if (response.status === 200) {
              setCandidateData(response.data.data);
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
  if (roleStore.role != "User" && roleStore.role != "") {
    return <>Unauthorized</>;
  }

  const decision = async (status: number, id: number) => {
    try {
      await axios.post(
        `${baseUrl}/candidate/${id}`,
        { status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Decision Made`);
      router.push("/candidate");
    } catch (err) {
      console.log("Decision", err);
      toast.error("Something went Wrong");
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading title="View Candidate" description="" />
        </div>
        <div className="mx-[50px]">
          <Card>
            <div className="md:grid md:grid-cols-3 gap-8">
              <CardHeader>
                <CardTitle>Name</CardTitle>
                <CardDescription>{candidateData?.name}</CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>
                  {getCandidateStatus(candidateData?.status)}
                </CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle>Position</CardTitle>
                <CardDescription>
                  {candidateData?.position?.name}
                </CardDescription>
              </CardHeader>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Manifesto</CardTitle>
                <CardDescription>{candidateData?.manifesto} </CardDescription>
              </CardHeader>
            </div>
            {candidateData?.status === 0 && (
              <div className="md:flex gap-3 mx-5 my-3">
                <Button
                  className="bg-green-600 hover:bg-green-800"
                  onClick={() => {
                    decision(1, candidateData?.id);
                  }}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => {
                    decision(-1, candidateData?.id);
                  }}
                  className="bg-red-600 hover:bg-red-800"
                >
                  Reject
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};
export default CandidatePage;
