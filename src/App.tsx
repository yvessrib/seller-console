import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutPage } from "./pages/layout";
import LeadsPage from "./pages/leads-page";
import { AppProvider } from "./contexts/app-context";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<LayoutPage children={<LeadsPage />} pageTitle="Leads" />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
