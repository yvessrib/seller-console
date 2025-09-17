import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type FilterFn
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../../components/ui/select"

import { Input } from "../../components/ui/input"

import React from "react"
import { Button } from "../../components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[]
  onRowClick?: (row: TData) => void
}

const globalFilterFn = <TData,>(
  row: Parameters<FilterFn<TData>>[0],
  columnId: Parameters<FilterFn<TData>>[1],
  filterValue: Parameters<FilterFn<TData>>[2]
) => {
  const name = (row.getValue("name") ?? "").toString().toLowerCase()
  const company = (row.getValue("company") ?? "").toString().toLowerCase()
  const search = (filterValue ?? "").toString().toLowerCase()

  return name.includes(search) || company.includes(search)
}

export function LeadsTable<TData, TValue>({
  columns,
  data,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(() => {
    const saved = localStorage.getItem("leads-sorting");
    return saved ? JSON.parse(saved) : [];
  });
  const [globalFilter, setGlobalFilter] = React.useState<string>(() => {
    return localStorage.getItem("leads-globalFilter") ?? "";
  });
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null)

  const [statusFilter, setStatusFilter] = React.useState<string>(() => {
    return localStorage.getItem("leads-statusFilter") ?? "all";
  });

  React.useEffect(() => {
    localStorage.setItem("leads-globalFilter", globalFilter);
  }, [globalFilter]);

  React.useEffect(() => {
    localStorage.setItem("leads-sorting", JSON.stringify(sorting));
  }, [sorting]);

  React.useEffect(() => {
    localStorage.setItem("leads-statusFilter", statusFilter);
  }, [statusFilter]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn
  })

  React.useEffect(() => {
    table.getColumn("status")?.setFilterValue(statusFilter === "all" ? undefined : statusFilter);
  }, [statusFilter, table]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search name or company..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />

        <Select
          // onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)}
          // defaultValue="all"
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="ml-2">
            <SelectValue>Status</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroups) => (
              <TableRow key={headerGroups.id}>
                {headerGroups.headers.map((header) => {
                  return (
                    <TableHead className="bg-emerald-700 text-white" key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => {
                    onRowClick?.(row.original);
                    setSelectedRowId(row.id);
                  }}
                  data-state={row.getIsSelected() && "selected"}
                  className={`hover:cursor-pointer hover:bg-emerald-200 ${selectedRowId === row.id ? "bg-emerald-200" : ""}`}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}