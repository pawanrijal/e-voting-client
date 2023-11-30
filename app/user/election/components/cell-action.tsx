"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash, View } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { AlertModal } from "@/components/modals/alert-modal";

import { ElectionColumn } from "./columns";
import { baseUrl } from "@/lib/utils";

interface CellActionProps {
  data: ElectionColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Election ID copied to clipboard.");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/user/election/${data.id}`)}
          >
            <View className="mr-2 h-4 w-4" /> Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
