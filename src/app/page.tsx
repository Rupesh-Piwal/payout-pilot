// app/dashboard/page.tsx or app/page.tsx (if root dashboard)
"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { UpcomingPayoutsTable } from "@/components/dashboard/upcoming-payouts-table";
import { usePayoutStats } from "@/hooks/usePayoutStatus";

export default function Dashboard() {
  const router = useRouter();
  const { stats, loading, error } = usePayoutStats();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>Failed to load stats.</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Dashboard">
          <Button
            onClick={() => router.push("/schedule")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="size-4 mr-2" />
            New Payout
          </Button>
        </PageHeader>

        <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50">
          <StatsCards />
          <QuickActions />
          <UpcomingPayoutsTable
            payouts={stats.upcomingPayouts}
            totalScheduled={stats.totalScheduled}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
