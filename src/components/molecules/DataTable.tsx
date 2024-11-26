"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppContext } from "~/utils/lib/context/app-context";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState<TData[]>(() => [...data]);
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [editedRows, setEditedRows] = useState({});

  const { isLoadingUpdateProdLocation } = useAppContext();

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setTableData((old: any) =>
            old.map((row: any, index: any) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old: any) =>
            old.map((row: any, index: any) =>
              index === rowIndex ? data[rowIndex] : row
            )
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setTableData((old: any) =>
          old.map((row: any, index: any) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                movingStatus:
                  columnId === "movingStatus"
                    ? value
                    : old[rowIndex].movingStatus,
                ProductLocation:
                  columnId === "ProductLocation_location"
                    ? value
                    : old[rowIndex].ProductLocation,
                productLocationId:
                  columnId === "ProductLocation_location"
                    ? value?.id
                    : old[rowIndex].productLocationId,
              };
            }
            return row;
          })
        );
      },
    },
  });

  console.log(isLoadingUpdateProdLocation);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
