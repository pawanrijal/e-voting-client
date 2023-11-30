"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type PositionColumn = {
  id: string;
  name: string;
  status: string;
  position: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<PositionColumn>[] = [
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
