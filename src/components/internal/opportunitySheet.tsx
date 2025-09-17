import { Sheet, SheetHeader, SheetContent, SheetTitle } from "../ui/sheet";
import { type Lead } from "../../pages/leads-page/columns";
import { OpportunityForm } from "./opportunityForm";

export type Opportunity = {
  id: number,
  name: string,
  stage: string,
  amount: number,
  accountName: string,
}

interface OpportunitySheetProps {
  lead: Lead | null,
  isOpen: boolean,
  onOpenChange: (open: boolean) => void,
  onSave: (create: Opportunity) => void
}

export function OpportunitySheet({
  lead,
  isOpen,
  onOpenChange,
  onSave
}: OpportunitySheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-emerald-700 text-2xl">Create Opportunity</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-2 px-4">  
          <OpportunityForm
            lead={lead}
            onCreate={onSave}
            onCancel={() => onOpenChange(false)}
          />
        </div>

      </SheetContent>
    </Sheet>
  )
  
}