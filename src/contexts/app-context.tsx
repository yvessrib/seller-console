/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import fetchLeads from "../services/fakeApi"

export type Lead = {
  id: number
  name: string
  company: string
  email: string
  source: string
  score: number
  status: string
}

export type Opportunity = {
  name: string
  stage: string
  amount: number
  accountName: string
}

type appContextType = {
  leads: Lead[]
  getLeads: () => void
  updateLead: (updated: Lead) => void
  opportunities: Opportunity[]
  createOpportunity: (opportunity: Opportunity) => void
}

const AppContext = createContext({} as appContextType)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
  }, [])

  const getLeads = () => {
    fetchLeads()
      .then(setLeads)
  }

  const createOpportunity = (opportunity: Opportunity) => {

    const addOpportunity = {
      id: opportunities.length + 1,
      ...opportunity
    }

    setOpportunities((prev) => [...prev, addOpportunity])
  }

  const updateLead = (updated: Lead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updated.id ? updated : lead))
    )
  }

  return (
    <AppContext.Provider 
      value={{ 
        leads,
        getLeads,
        opportunities,
        createOpportunity,
        updateLead
      }}
    >
      {children}
    </AppContext.Provider>
  )
} 

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}