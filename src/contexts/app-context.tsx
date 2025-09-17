/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import fetchLeads from "../services/fakeApi"
import { type Lead, type Opportunity } from "../types/app"

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
    const storedLeads = localStorage.getItem("leads")
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads))
    } else {
      // primeira carga vem do fakeApi
      fetchLeads().then((data) => {
        setLeads(data)
        localStorage.setItem("leads", JSON.stringify(data))
      })
    }

    const storedOpportunities = localStorage.getItem("opportunities")
    if (storedOpportunities) {
      setOpportunities(JSON.parse(storedOpportunities))
    }
  }, [])

  const getLeads = () => {
    fetchLeads().then((data) => {
      setLeads(data)
      localStorage.setItem("leads", JSON.stringify(data))
    })
  }

  const createOpportunity = (opportunity: Opportunity) => {

    const addOpportunity = {
      id: opportunities.length + 1,
      ...opportunity
    }

    setOpportunities((prev) => {
      const updated = [...prev, addOpportunity]
      localStorage.setItem("opportunities", JSON.stringify(updated))
      return updated
    })
  }

  const updateLead = (updated: Lead) => {
    setLeads((prev) => {
      const newLeads = prev.map((lead) => lead.id === updated.id ? updated : lead)
      localStorage.setItem("leads", JSON.stringify(newLeads))
      return newLeads
    })
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