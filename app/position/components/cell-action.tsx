"use client";

import axios from "axios";
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

import { PositionColumn } from "./columns";
import { baseUrl } from "@/lib/utils";

interface CellActionProps {
  data: PositionColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Position ID copied to clipboard.");
  };
  const handleDelete = async (id: string) => {
    const isconfirmed = window.confirm("Are you sure you want to delete?");
    const token = localStorage.getItem("auth_token");
    if (isconfirmed) {
      try {
        await axios.delete(`${baseUrl}/position/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Deleted Successfully");
        router.refresh();
        window.location.reload();
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
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
          <DropdownMenuItem onClick={() => router.push(`/position/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(data.id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/position/${data.id}/details`)}
          >
            <View className="mr-2 h-4 w-4" /> Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
