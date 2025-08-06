// hooks/usePayoutStats.ts
import { getPayoutStats } from "@/lib/actions/schedule";
import { useState, useEffect, useCallback } from "react";

export interface PayoutStats {
  totalScheduled: number;
  totalActive: number;
  totalCompleted: number;
  totalFailed: number;
  totalAmount: number; // Decimal casted to number
  pendingSchedules: number;

  upcomingPayouts: Array<{
    id: string;
    scheduledDate: string; // Date -> string
    payout: {
      recipientName: string;
      amount: number; // Decimal -> number
      currency: "USD" | "EUR" | "GBP" | "BTC" | "ETH" | "USDC";
    };
  }>;

  recentTransactions: Array<{
    id: string;
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";
    amount: number; // Decimal -> number
    currency: "USD" | "EUR" | "GBP" | "BTC" | "ETH" | "USDC";
    createdAt: string; // Date -> string
    payout: {
      recipientName: string;
    };
  }>;

  summary: {
    totalPayouts: number;
    activePayouts: number;
    successRate: number;
  };
}

export function usePayoutStats(userId?: string) {
  const [stats, setStats] = useState<PayoutStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getPayoutStats(userId);

      if (result.success && result.data) {
        setStats(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch stats");
      }
    } catch (err) {
      setError("Failed to fetch payout statistics");
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
