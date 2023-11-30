"use client";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { ApiList } from "@/components/ui/api-list";

import { columns, ElectionColumn } from "./columns";

interface ElectionClientProps {
  data: any;
}

export const ElectionClient: React.FC<ElectionClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Elections (${data.length})`}
          description="View elections"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
    </>
  );
};
