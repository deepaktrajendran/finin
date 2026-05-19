"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ LOGIN FUNCTION
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      // ✅ Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      
      {/* ✅ Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="border-border bg-card/60 backdrop-blur-xl shadow-2xl">
          
          <CardHeader className="space-y-3 text-center pb-8">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
              F
            </div>

            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Welcome to FININ
              </CardTitle>
              <CardDescription>
                Enter your details to access your portfolio
              </CardDescription>
            </div>
          </CardHeader>

          {/* ✅ FORM */}
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">

              <Input
                type="email"
                placeholder="Enter email"
                required
                className="h-11"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Enter password"
                required
                className="h-11"
                onChange={(e) => setPassword(e.target.value)}
              />

            </CardContent>

            <CardFooter className="flex flex-col gap-3">

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* ✅ ✅ FIXED SIGNUP BUTTON */}
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => router.push("/signup")}
              >
                Create an account
              </Button>

            </CardFooter>
          </form>

        </Card>
      </motion.div>
    </div>
  );
}