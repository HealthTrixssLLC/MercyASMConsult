import React from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import mercyLogo from "@assets/image_1782296085670.png";
import healthtrixssLogo from "@assets/image_1782296236638.png";

export function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-background">
      <header className="flex justify-center px-6 py-4 border-b bg-card shrink-0">
        <div className="inline-flex flex-col items-stretch gap-2.5">
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <img src={healthtrixssLogo} alt="HealthTrixss" className="h-[20px] md:h-[28px] w-auto" />
            <span className="h-9 w-px bg-border" />
            <img src={mercyLogo} alt="Mercy" className="h-9 md:h-12 w-auto -translate-y-[3px]" />
          </div>
          <p className="w-full text-center uppercase font-semibold text-muted-foreground tracking-[0.18em] text-[12.6px] md:text-[16.2px]">
            ASM Submission Process Review
          </p>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
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
            <span className="text-sm uppercase tracking-widest font-medium text-muted-foreground">Engagement Topics</span>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
