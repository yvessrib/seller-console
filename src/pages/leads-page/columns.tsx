import type { ColumnDef } from "@tanstack/react-table"
import { ArrowDown } from "lucide-react"
import { Button } from "../../components/ui/button"
import { type Lead } from "../../types/app"

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:underline hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Id
          <ArrowDown className="ml h-4 w-4" />
        </Button>
      )
    },
    size: 20
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200
  },
  {
    accessorKey: "company",
    header: "Company",
    size: 150
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 250
  },
  {
    accessorKey: "source",
    header: "Source",
    size: 120
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:underline hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Score
          <ArrowDown className="ml h-4 w-4" />
        </Button>
      )
    },
    size: 40
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    filterFn: "equalsString"
  }
]