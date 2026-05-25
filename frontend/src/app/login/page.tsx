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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful ✅");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F4F8] p-4 relative overflow-hidden">
      
      {/* Light Theme Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#B4D6F1]/30 blur-[100px] rounded-full" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#D0E4F5]/40 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="border border-[#E0E4E8] bg-white shadow-xl rounded-xl">
          
          <CardHeader className="space-y-3 text-center pb-8 pt-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#1D70B8] text-white text-3xl font-bold shadow-md">
              F
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-[#2C4869]">
                Welcome to FININ
              </CardTitle>
              <CardDescription className="text-[#64748b]">
                Enter your details to access your portfolio
              </CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 px-8">
              <Input
                type="email"
                placeholder="Enter email"
                required
                className="h-12 bg-[#F8F9FA] border-[#E0E4E8] focus-visible:ring-[#1D70B8]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Enter password"
                required
                className="h-12 bg-[#F8F9FA] border-[#E0E4E8] focus-visible:ring-[#1D70B8]"
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-3 px-8 pb-8 pt-4">
              <Button type="submit" className="w-full h-12 bg-[#1D70B8] hover:bg-[#155A96] text-white font-medium" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full h-12 text-[#1D70B8] hover:bg-[#F0F4F8] hover:text-[#155A96]"
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