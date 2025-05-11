
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";
import { Sidebar } from "@/components/ui/sidebar";
import ThemeLanguageControl from "../common/ThemeLanguageControl";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarNav />
        </Sidebar>
        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-4">
              <ThemeLanguageControl />
              <div className="text-right">
                <div className="text-sm font-medium">John Smith</div>
                <div className="text-xs text-muted-foreground">Administrator</div>
              </div>
              <div className="h-8 w-8 rounded-full bg-hotel-500 flex items-center justify-center text-white text-sm font-medium">
                JS
              </div>
            </div>
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
