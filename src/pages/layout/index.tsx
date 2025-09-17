import { ChevronRight } from "lucide-react";
import { AppSidebar } from "../../components/internal/appSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";

interface LayoutProps {
  children?: React.ReactNode,
  pageTitle?: string;
}

export function LayoutPage({ children, pageTitle }: LayoutProps) {
  return (
    <SidebarProvider  defaultOpen={true}>
      <AppSidebar />
      <div className="flex-1 overflow-x-auto px-3 h-screen">
          <div className="flex gap-3 items-center pt-4">
            <SidebarTrigger className="pt-1" />
            <div>
              <span className="pr-5">|</span>
              <span className="text-base">Seller Console</span>
              <ChevronRight className="inline mx-2 mb-1" size={14} />
              <span className="text-base font-bold">{pageTitle}</span>
            </div>
          </div>
          {children}
      </div>
    </SidebarProvider>
  )
}