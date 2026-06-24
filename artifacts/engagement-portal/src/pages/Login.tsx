import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Lock } from "lucide-react";
import logo from "@assets/image_1782294447860.png";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = login(email, password);
    if (!ok) {
      setError(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-sidebar px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={logo}
            alt="HealthTrixss"
            className="h-16 w-auto mb-5 rounded-md bg-white/95 p-2 shadow-sm"
          />
          <h1 className="font-serif text-2xl tracking-tight text-sidebar-primary">HealthTrixss</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1 uppercase tracking-widest font-medium">
            ASM Submission Process Review
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 shadow-xl">
          <h2 className="font-serif text-lg text-card-foreground mb-1">Sign in</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your credentials to access the portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="you@healthtrixss.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive" role="alert">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Incorrect email or password.</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              <Lock className="w-4 h-4" />
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center text-[11px] text-sidebar-foreground/40 mt-6">
          HealthTrixss, Inc. — Authorized access only
        </p>
      </div>
    </div>
  );
}
