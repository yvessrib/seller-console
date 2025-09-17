import { type Lead } from "../../types/app";
import { Input } from "../ui/input";
import { Select, SelectItem } from "../ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "../ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

interface LeadFormProps {
  lead: Lead | null,
  onSave: (update: Lead) => void
  onCancel: () => void
}

const leadSchema = z.object({
  email: z.string().email("Invalid email address"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost", "Converted"])
})

type LeadFormData = z.infer<typeof leadSchema>

export function LeadForm({ lead, onSave, onCancel }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      email: lead?.email || "",
      status: (lead?.status as LeadFormData["status"]) || "New"
    }
  })

  const onSubmit = (data: LeadFormData) => {
    if (!lead?.id) return console.log("Lead ID is missing")
    onSave({ ...lead, ...data })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium selection:bg-emerald-700">Email</label>
        <Input {...register("email")} />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="flex flex-row items-center gap-2">
        <label className="text-sm font-medium">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="border-2 rounded-[8px] w-fit py-1 px-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="relative top-24 left-12 bg-white border-2 rounded-[8px]">
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="bg-emerald-700 hover:bg-emerald-900">Save</Button>
        <Button variant="outline" type="button" onClick={onCancel} className="hover:bg-red-700 hover:text-white">
          Cancel
        </Button>
      </div>
    </form>
  )
}