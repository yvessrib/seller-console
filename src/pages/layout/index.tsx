import { AppSidebar } from "../../components/internal/appSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

export function LayoutPage({ children }: LayoutProps) {
  return (
    <SidebarProvider className="bg-zinc-900" defaultOpen={true}>
      <AppSidebar />
      <div className="flex-1 overflow-x-auto p-8 h-screen">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}