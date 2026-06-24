import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Shell } from "@/components/layout/Shell";
import Phase1 from "@/pages/Phase1";
import KickoffPlanning from "@/pages/KickoffPlanning";
import Kickoff from "@/pages/Kickoff";
import DiscussionJun08 from "@/pages/DiscussionJun08";
import DiscussionJun10 from "@/pages/DiscussionJun10";
import DiscussionJun12 from "@/pages/DiscussionJun12";
import DiscussionJun17 from "@/pages/DiscussionJun17";
import JayMaoGuidance from "@/pages/JayMaoGuidance";
import HpLayoutSql from "@/pages/HpLayoutSql";
import SubmissionStrategy from "@/pages/SubmissionStrategy";
import ReconciliationStrategy from "@/pages/ReconciliationStrategy";

const queryClient = new QueryClient();

function Router() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Shell>
      <Switch>
        <Route path="/" component={() => <Redirect to="/phase/1" />} />
        <Route path="/phase/1" component={Phase1} />
        <Route path="/kickoff-planning" component={KickoffPlanning} />
        <Route path="/kickoff" component={Kickoff} />
        <Route path="/discussions/2026-06-08" component={DiscussionJun08} />
        <Route path="/discussions/2026-06-10/mao-guidance" component={JayMaoGuidance} />
        <Route path="/discussions/2026-06-10" component={DiscussionJun10} />
        <Route path="/discussions/2026-06-12" component={DiscussionJun12} />
        <Route path="/discussions/2026-06-17" component={DiscussionJun17} />
        <Route path="/asm-analysis-current" component={HpLayoutSql} />
        <Route path="/submission-strategy" component={SubmissionStrategy} />
        <Route path="/reconciliation-strategy" component={ReconciliationStrategy} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
