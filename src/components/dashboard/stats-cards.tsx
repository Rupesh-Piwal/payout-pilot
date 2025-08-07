import { Calendar, DollarSign, Send, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePayoutStats } from "@/hooks/usePayoutStatus";

export function StatsCards() {
  const { stats, loading, error } = usePayoutStats();

  if (loading)
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <Card className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/30 backdrop-blur-xl rounded-2xl shadow-2xl animate-pulse">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-slate-700/50 rounded w-20"></div>
                  <div className="w-6 h-6 bg-slate-700/50 rounded"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-8 bg-slate-700/50 rounded w-24"></div>
                <div className="h-3 bg-slate-700/30 rounded w-16"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-rose-800/30 rounded-2xl blur-xl"></div>
        <Card className="relative bg-gradient-to-br from-rose-950/50 via-rose-900/40 to-rose-950/50 border border-rose-800/30 backdrop-blur-xl rounded-2xl shadow-2xl">
          <CardContent className="p-6">
            <p className="text-rose-300 text-center">
              Error loading stats: {error}
            </p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Volume */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-emerald-500/5 to-teal-600/10 rounded-2xl blur-xl group-hover:from-emerald-600/20 group-hover:via-emerald-500/10 group-hover:to-teal-600/20 transition-all duration-500"></div>
        <Card className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/30 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 group-hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-300/80 group-hover:text-slate-200 transition-colors duration-300">
              Total Volume
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-xl border border-emerald-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all duration-300">
              <DollarSign className="size-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              ${stats?.totalAmount}
            </div>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              All time performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* This Month */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 via-cyan-500/5 to-sky-600/10 rounded-2xl blur-xl group-hover:from-teal-600/20 group-hover:via-cyan-500/10 group-hover:to-sky-600/20 transition-all duration-500"></div>
        <Card className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/30 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-teal-900/20 transition-all duration-300 group-hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-300/80 group-hover:text-slate-200 transition-colors duration-300">
              This Month
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-teal-600/20 to-cyan-600/20 rounded-xl border border-teal-500/20 group-hover:from-teal-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
              <TrendingUp className="size-4 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              $24,890
            </div>
            <p className="text-xs text-teal-400/80 group-hover:text-teal-300 transition-colors duration-300">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-yellow-500/5 to-orange-600/10 rounded-2xl blur-xl group-hover:from-amber-600/20 group-hover:via-yellow-500/10 group-hover:to-orange-600/20 transition-all duration-500"></div>
        <Card className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/30 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 group-hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-300/80 group-hover:text-slate-200 transition-colors duration-300">
              Scheduled
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl border border-amber-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all duration-300">
              <Calendar className="size-4 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {stats?.totalScheduled}
            </div>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              Active payouts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-pink-500/5 to-fuchsia-600/10 rounded-2xl blur-xl group-hover:from-rose-600/20 group-hover:via-pink-500/10 group-hover:to-fuchsia-600/20 transition-all duration-500"></div>
        <Card className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/30 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-rose-900/20 transition-all duration-300 group-hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-300/80 group-hover:text-slate-200 transition-colors duration-300">
              Pending
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-rose-600/20 to-pink-600/20 rounded-xl border border-rose-500/20 group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-all duration-300">
              <Send className="size-4 text-rose-400 group-hover:text-rose-300 transition-colors duration-300" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              8
            </div>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
