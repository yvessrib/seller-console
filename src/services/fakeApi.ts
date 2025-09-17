import { type Lead } from "../types/app"
export default function fetchLeads(): Promise<Lead[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("/src/data/leads.json")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch leads")
          return res.json()
        })
        .then(resolve)
        .catch((error) => {
          console.error(error)
          resolve([]) // Resolve with an empty array on error
        })
    }, 800)
  })
}