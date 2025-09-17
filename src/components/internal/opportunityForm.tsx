import { type Lead, type Opportunity } from "../../types/app";
import { Input } from "../ui/input";
import { Select, SelectItem } from "../ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "../ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

interface OpportunityFormProps {
  lead: Lead | null,
  onCreate: (create: Opportunity) => void
  onCancel: () => void
}

const opportunitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  stage: z.enum(["Qualification", "Proposal","Negotiation", "Won", "Lost"]),
  amount: z.number().min(0, "Amount must be non-negative"),
  accountName: z.string().min(1, "Account Name is required"),
})

type OpportunityFormData = z.infer<typeof opportunitySchema>

export function OpportunityForm({ lead, onCreate, onCancel }: OpportunityFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      accountName: lead?.name || "",
      stage: "Qualification",
      amount: 0
    }
  })

  const onSubmit = (data: OpportunityFormData) => {
    if (!lead?.id) return console.log("Lead ID is missing")
    onCreate({ ...data })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      
      <div>
        <label className="text-sm font-medium selection:bg-emerald-700">Opportunity Name</label>
        <Input {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium selection:bg-emerald-700">Account Name</label>
        <Input {...register("accountName")} />
        {errors.accountName && <p className="text-sm text-red-600">{errors.accountName.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium selection:bg-emerald-700">Amount</label>
        <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true },)} />
        {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
      </div>
      
      <div className="flex flex-row items-center gap-2">
        <label className="text-sm font-medium">Stage</label>
        <Controller
          name="stage"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="border-2 rounded-[8px] w-fit py-1 px-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="relative top-24 left-11 bg-white border-2 rounded-[8px]">
                <SelectItem value="Qualification">Qualification</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.stage && <p className="text-sm text-red-600">{errors.stage.message}</p>}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="bg-emerald-700 hover:bg-emerald-900">Create</Button>
        <Button variant="outline" type="button" onClick={onCancel} className="hover:bg-red-700 hover:text-white">
          Cancel
        </Button>
      </div>
    </form>
  )
}