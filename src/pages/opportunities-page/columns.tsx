import type { ColumnDef } from "@tanstack/react-table"
import { type Opportunity } from "../../types/app"

export const columns: ColumnDef<Opportunity>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 20
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200
  },
  {
    accessorKey: "accountName",
    header: "Account Name",
    size: 150
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 40,
    cell: ({ getValue }) => {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(getValue() as number)
    }
  },
  {
    accessorKey: "stage",
    header: "Stage",
    size: 100
  }
]