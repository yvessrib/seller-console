import { useEffect, useState} from "react";
import { columns, type Lead } from "./columns";
import { DataTable } from "./data-table";
import  fetchLeads  from "../../services/fakeApi";
import { LeadsSheet } from "../../components/internal/leadsSheet";

export default function LeadsPage() {

  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
  }, [])

  const handleSave = (updated: Lead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updated.id ? updated : lead))
    )
    setIsSheetOpen(false)
  }

  return (
    <div>
      <DataTable columns={columns} data={leads} onRowClick={(lead) => {
        setSelectedLead(lead)
        setIsSheetOpen(true)
      }}/>

      <LeadsSheet
        lead={selectedLead!}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSave={handleSave}
      />
    </div>
  )
}