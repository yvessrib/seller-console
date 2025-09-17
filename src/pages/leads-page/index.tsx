import { useEffect, useState, type SetStateAction } from "react";
import { columns, type Lead } from "./columns";
import { DataTable } from "./data-table";
import  fetchLeads  from "../../services/fakeApi";

export default function LeadsPage() {

  const [leads, setLeads] = useState<Lead[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .catch((error: SetStateAction<null>) => setError(error))
  }, [])

  return (
    <div>
      <DataTable columns={columns} data={leads} />
    </div>
  )
}