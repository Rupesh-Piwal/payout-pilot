// app/dashboard/page.tsx or app/page.tsx (if root dashboard)
"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { UpcomingPayoutsTable } from "@/components/dashboard/upcoming-payouts-table";
import { usePayoutStats } from "@/hooks/usePayoutStatus";

export default function Dashboard() {
  const router = useRouter();
  const { stats, loading, error } = usePayoutStats();

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-t-emerald-400 border-r-amber-400 border-b-rose-400 border-l-cyan-400 animate-spin"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="bg-rose-950/30 border border-rose-800/50 rounded-xl p-6 backdrop-blur-sm">
          <p className="text-rose-300">Error: {error}</p>
        </div>
      </div>
    );

  if (!stats)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-6 backdrop-blur-sm">
          <p className="text-amber-300">Failed to load stats.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <PageHeader title="Dashboard">
            <Button
              onClick={() => router.push("/schedule")}
              className="relative group overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 border-0 shadow-lg shadow-emerald-900/25 transition-all duration-300 hover:shadow-emerald-900/40 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Plus className="size-4 mr-2 relative z-10" />
              <span className="relative z-10">New Payout</span>
            </Button>
          </PageHeader>

          <main className="flex flex-1 flex-col gap-8 p-8 bg-[#111111] backdrop-blur-sm">
            {/* Ambient background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-600/3 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <StatsCards />
            </div>

            <div className="relative z-10">
              <UpcomingPayoutsTable
                payouts={stats.upcomingPayouts}
                totalScheduled={stats.totalScheduled}
              />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
