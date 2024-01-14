"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CelllAction } from "./cell-action";

export type BillboardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: "label",
		header: "Header",
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
	},
	{
		id: "actions",
		cell: ({ row }) => <CelllAction data={row.original} />
	}
];
