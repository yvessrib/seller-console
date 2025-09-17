import { columns } from "./columns";
import { OpportunitiesTable } from "./data-table";
import { useAppContext } from "../../contexts/app-context";

export default function OpportunitiesPage() {

  const { opportunities } = useAppContext()

  return (
    <div className="py-4">
      <OpportunitiesTable columns={columns} data={opportunities} />
    </div>
  )
}