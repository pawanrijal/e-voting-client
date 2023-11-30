"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ElectionColumn = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
};

export const columns: ColumnDef<ElectionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  // {
  //   accessorKey: "createdBy",
  //   header: "Created By",
  // },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
