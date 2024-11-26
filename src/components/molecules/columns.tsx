/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { type Prisma } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { EditCell } from "../../pages/product-list/EditCell";
import TableCell from "../atoms/TableCell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProdProps = {
  title?: string;
  description?: string | null;
  brand?: string;
  category?: string;
  price?: any;
  stock?: number;
  thumbnail?: string;
  ProductLocation?: any;
};

export const Columns: ColumnDef<ProdProps>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <img
            src={row?.getValue("thumbnail")}
            alt={row?.getValue("title")}
            className="h-10 w-10 rounded-md object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 w-[400px] text-left">
          {row?.getValue("description")}
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row?.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "ProductLocation.location",
    header: "Product Location",
    cell: TableCell,
  },
  {
    accessorKey: "movingStatus",
    header: "Moving Status",
    cell: TableCell,
  },
  {
    accessorKey: "edit",
    header: "",
    cell: EditCell,
  },
];

export default Columns;
