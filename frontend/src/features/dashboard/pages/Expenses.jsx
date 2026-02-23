import React from "react";

import { UserAuth } from "@/features/auth/context/AuthContext";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Expenses = () => {
  const { session } = UserAuth();

  const userName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email?.split("@")[0] ||
    "User";

  return (
    <SidebarProvider style={{ "--sidebar-width": "260px" }}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Expenses" />
        <div className="p-8">
          <p className="text-muted-foreground">
            {userName} this is where you can create, modify and view your expenses from your projects.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Expenses;
