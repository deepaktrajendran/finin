"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        email,
        password,
      });

      alert("Signup successful ✅");

      router.push("/"); // back to login
    } catch (err) {
      console.error(err);
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-black p-8 rounded-xl text-white">

        <h2 className="text-xl mb-4">Create Account</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-3 p-2 text-black"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-3 p-2 text-black"
        />

        <button
          onClick={handleSignup}
          className="bg-yellow-500 px-4 py-2 w-full text-black"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
