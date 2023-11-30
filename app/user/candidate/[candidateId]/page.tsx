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
          } catch (err: any) {
            toast.error(err.response.data.message);
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
            <div className="md:grid md:grid-cols-3 gap-8">
              <CardHeader>
                <CardTitle>Vote Count</CardTitle>
                <CardDescription>{10} </CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle>Vote Status</CardTitle>
                <CardDescription>Won </CardDescription>
              </CardHeader>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Manifesto</CardTitle>
                {/* <CardDescription>{candidateData?.manifesto} </CardDescription> */}

                <div
                  dangerouslySetInnerHTML={{
                    __html: candidateData?.manifesto || "<p></p>",
                  }}
                ></div>
              </CardHeader>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default CandidatePage;
