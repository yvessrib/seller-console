import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutPage } from "./pages/layout";
import LeadsPage from "./pages/leads-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage children={<LeadsPage />} />} />
      </Routes>
    </BrowserRouter>
  )
}
