"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CelllAction } from "./cell-action";

export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: "name",
		header: "name",
	},
	{
		accessorKey: "billboard",
		header: "Connected Billboard",
		cell: ({ row }) => row.original.billboardLabel,
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CelllAction data={row.original} />,
	},
];
