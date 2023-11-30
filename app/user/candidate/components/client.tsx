"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";

interface CandidateClientProps {
  data: any;
}

export const CandidateClient: React.FC<CandidateClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Candidates (${data.length})`}
          description="View canidate data"
        />
        <Button onClick={() => router.push(`/user/candidate/request`)}>
          <Plus className="mr-2 h-4 w-4" /> Request For Candidancy
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="position" columns={columns} data={data} />
      <Separator />
    </>
  );
};
