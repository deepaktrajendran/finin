"use client";

import { Search } from "lucide-react";
import { MOCK_USER } from "@/lib/mockData";
import { NotificationsPanel } from "./NotificationsPanel";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stocks, mutual funds..."
            className="w-full bg-muted/50 pl-9 border-transparent focus-visible:bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationsPanel />
        
        <div className="h-6 w-px bg-border mx-1" />
        
        <button className="flex items-center gap-3 rounded-full hover:bg-muted/50 py-1 px-2 transition-colors">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-medium text-foreground leading-none">{MOCK_USER.name}</span>
          </div>
          <img
            src={MOCK_USER.avatarUrl}
            alt={MOCK_USER.name}
            className="h-8 w-8 rounded-full border border-border"
          />
        </button>
      </div>
    </header>
  );
}
