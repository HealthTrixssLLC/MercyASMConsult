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
        <header className="md:hidden flex items-center p-4 border-b bg-card">
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
        </header>
        <header className="flex justify-center px-6 py-4 border-b bg-card shrink-0">
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <p className="uppercase font-semibold text-muted-foreground tracking-[0.18em] text-[12.6px] md:text-[16.2px]">
              ASM Submission Process Review For
            </p>
            <img src={mercyLogo} alt="Mercy" className="h-[25.92px] md:h-[34.56px] w-auto -translate-y-[3px]" />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
