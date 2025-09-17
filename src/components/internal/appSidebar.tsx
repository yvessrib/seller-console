import { Pin, UserPen, BriefcaseBusiness } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar
} from "../ui/sidebar";

const items = [
  {
    title: "Leads",
    icon: UserPen,
    href: "/"
  },
  {
    title: "Opportunities",
    icon: BriefcaseBusiness,
    href: "/opportunities"
  }
]

export function AppSidebar() {

  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center mt-2" >
        <div className="text-emerald-700 font-bold text-lg flex items-center">
          { state === "expanded" && (
            <div>
              <Pin className="inline mr-2 mb-1" size={20} />
              CoverPin
            </div>
          )}
          { state === "collapsed" && (
            <Pin className="inline" size={20} />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 mt-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="text-zinc-900 text-2xl">
                    <SidebarMenuButton className="hover:bg-emerald-700 hover:text-white transition-all" asChild>
                      <a href={item.href}>
                        <item.icon className="h-6 w-6" />
                        <span className="text-base">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex text-center text-sm">
        {state === "expanded" && (
          <div>All Rights Reserved</div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
