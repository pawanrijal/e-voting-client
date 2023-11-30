"use client";
import { findElectionById } from "@/apis/election/findById";
import Navbar from "@/components/admin/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRole } from "@/hooks/useRoleStore";
import { Separator } from "@/components/ui/separator";
import Position from "./components/position";

const ElectionPage = ({ params }: { params: { electionId: number } }) => {
  const router = useRouter();
  const [electionData, setElectionData] = useState(null);
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
  if (roleStore.role != "User" && roleStore.role != "") {
    return <>Unauthorized</>;
  }
  console.log(electionData);
  return (
    <>
      <Navbar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Positions Included in {electionData?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Please choose the position
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            {electionData?.positions?.map((position: any) => (
              <Position
                key={position.id}
                name={position.name}
                description={position.description}
                id={position.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ElectionPage;
