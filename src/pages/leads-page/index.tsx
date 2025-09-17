import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function LeadsPage() {

  const data = [
    {
      id: 1,
      name: "Alice Johnson",
      company: "TechCorp",
      email: "alice.johnson@techcorp.com",
      source: "Website",
      score: 92,
      status: "Qualified",
    },
    {
      id: 2,
      name: "Bob Smith",
      company: "FinServ",
      email: "bob.smith@finserv.com",
      source: "Referral",
      score: 78,
      status: "Contacted",
    },
    {
      id: 3,
      name: "Carla Mendes",
      company: "Inova SA",
      email: "carla.mendes@inovasa.com",
      source: "LinkedIn",
      score: 85,
      status: "New",
    },
    {
      id: 4,
      name: "David Lee",
      company: "GlobalSoft",
      email: "david.lee@globalsoft.com",
      source: "Email Campaign",
      score: 60,
      status: "Lost",
    },
    {
      id: 5,
      name: "Emily Davis",
      company: "HealthPlus",
      email: "emily.davis@healthplus.com",
      source: "Conference",
      score: 88,
      status: "Qualified",
    },
    {
      id: 6,
      name: "Felipe Santos",
      company: "StartNow",
      email: "felipe.santos@startnow.com",
      source: "Website",
      score: 73,
      status: "Contacted",
    },
    {
      id: 7,
      name: "Grace Miller",
      company: "EduPro",
      email: "grace.miller@edupro.com",
      source: "LinkedIn",
      score: 95,
      status: "Qualified",
    },
    {
      id: 8,
      name: "Hugo Pereira",
      company: "LogiTrans",
      email: "hugo.pereira@logitrans.com",
      source: "Referral",
      score: 67,
      status: "New",
    },
]

  return (
    <div>
      <div>
        <span>Manage the leads</span>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}