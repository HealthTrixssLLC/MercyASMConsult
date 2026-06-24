import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Shell } from "@/components/layout/Shell";
import Phase1 from "@/pages/Phase1";
import Kickoff from "@/pages/Kickoff";
import Phase2 from "@/pages/Phase2";
import Phase3 from "@/pages/Phase3";

const queryClient = new QueryClient();

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={() => <Redirect to="/phase/1" />} />
        <Route path="/phase/1" component={Phase1} />
        <Route path="/kickoff" component={Kickoff} />
        <Route path="/phase/2" component={Phase2} />
        <Route path="/phase/3" component={Phase3} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
