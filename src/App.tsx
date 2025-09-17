import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutPage } from "./pages/layout";
import LeadsPage from "./pages/leads-page";
import { AppProvider } from "./contexts/app-context";
import OpportunitiesPage from "./pages/opportunities-page";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<LayoutPage children={<LeadsPage />} pageTitle="Leads" />} />
          <Route path="/opportunities" element={<LayoutPage children={<OpportunitiesPage />} pageTitle="Opportunities" />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
