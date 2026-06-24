import React from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import mercyLogo from "@assets/image_1782296085670.png";

export function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative">
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-sidebar border-sidebar-border">
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <span className="font-serif text-lg">HealthTrixss</span>
          </div>
          <img src={mercyLogo} alt="Mercy" className="h-7 w-auto" />
        </header>
        <header className="hidden md:flex items-center justify-end px-6 md:px-10 h-16 border-b bg-card">
          <img src={mercyLogo} alt="Mercy" className="h-8 w-auto" />
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
