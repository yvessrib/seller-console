import { Sheet, SheetHeader, SheetContent, SheetTitle, SheetFooter } from "../ui/sheet";
import { type Lead } from "../../pages/leads-page/columns";
import { LeadForm } from "./leadForm";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface LeadsSheetProps {
  lead: Lead | null,
  isOpen: boolean,
  onOpenChange: (open: boolean) => void,
  onSave: (update: Lead) => void,
  onConvert: () => void
}

export function LeadsSheet({
  lead,
  isOpen,
  onOpenChange,
  onSave,
  onConvert
}: LeadsSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-emerald-700 text-2xl">Lead Details</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2 px-4">
          <div className="flex flex-col gap-1 text-base">
            <span><strong className="text-emerald-700">Id:</strong> {lead?.id}</span>
            <span><strong className="text-emerald-700">Name:</strong> {lead?.name}</span>
            <span><strong className="text-emerald-700">Company:</strong> {lead?.company}</span>
            <span><strong className="text-emerald-700">Source:</strong> {lead?.source}</span>
            <span><strong className="text-emerald-700">Score:</strong> {lead?.score}</span>
          </div>

          <div className="flex flex-col gap-4 mt-2 pt-2 border-t">
            <span className="text-emerald-700 font-bold">Update lead</span>
            <LeadForm
              lead={lead}
              onSave={onSave}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>

        <SheetFooter className="flex">
          <Button 
            variant="outline" 
            className="self-end border-2 w-fit hover:bg-emerald-700 hover:text-white" 
            onClick={() => onConvert()}
          >
            <div>
              <span>Convert Lead</span>
              <ArrowRight className="inline ml-2 mb-1" size={14} />
            </div>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
  
}