import { useState } from "react";
import { columns, type Lead } from "./columns";
import { DataTable } from "./data-table";
import { LeadsSheet } from "../../components/internal/leadsSheet";
import { OpportunitySheet  } from "../../components/internal/opportunitySheet";
import { useAppContext } from "../../contexts/app-context";

export default function LeadsPage() {

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isLeadSheetOpen, setIsLeadSheetOpen] = useState(false)
  const [isOpportunitySheetOpen, setIsOpportunitySheetOpen] = useState(false)

  const { leads, updateLead, createOpportunity } = useAppContext()
  
  const handleSave = (updated: Lead) => {
    updateLead(updated)
    setIsLeadSheetOpen(false)
  }

  const handleConvertLead = () => {
    setIsLeadSheetOpen(false)
    setIsOpportunitySheetOpen(true)
  }

  return (
    <div>
      <DataTable columns={columns} data={leads} onRowClick={(lead) => {
        setSelectedLead(lead)
        setIsLeadSheetOpen(true)
      }}/>

      <LeadsSheet
        lead={selectedLead!}
        isOpen={isLeadSheetOpen}
        onOpenChange={setIsLeadSheetOpen}
        onSave={handleSave}
        onConvert={handleConvertLead}
      />

      <OpportunitySheet
        lead={selectedLead!}
        isOpen={isOpportunitySheetOpen}
        onOpenChange={setIsOpportunitySheetOpen}
        onSave={(opportunity) => {
          createOpportunity(opportunity)
          setIsOpportunitySheetOpen(false)
        }}
      />
    </div>
  )
}