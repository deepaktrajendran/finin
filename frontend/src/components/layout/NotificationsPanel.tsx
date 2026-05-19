"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-muted/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 z-50 rounded-xl border border-border bg-card p-4 shadow-lg ring-1 ring-black/5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {unreadCount} new
                </span>
              )}
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {MOCK_NOTIFICATIONS.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex flex-col gap-1 rounded-lg p-3 text-sm transition-colors ${
                    notification.isRead ? "bg-transparent" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-muted-foreground">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
