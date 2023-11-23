"use client";
import { findElectionById } from "@/apis/election/findById";
import Navbar from "@/components/admin/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ElectionForm } from "./components/election-form";

const ElectionPage = ({ params }: { params: { electionId: number } }) => {
  const router = useRouter();
  const [electionData, setElectionData] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/auth/login");
        } else {
          setToken(token);
          try {
            const response = await findElectionById(token, params.electionId);
            if (response.status === 200) {
              setElectionData(response.data.data);
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
  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ElectionForm initialData={electionData} token={token} />
        </div>
      </div>
    </>
  );
};
export default ElectionPage;
