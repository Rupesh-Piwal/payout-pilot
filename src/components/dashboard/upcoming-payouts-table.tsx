"use client";

import { Download, Filter, MoreHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";

// Updated interface to match your server action response
interface Payout {
  id: string;
  scheduledDate: string;
  payout: {
    recipientName: string;
    amount: number;
    currency: string;
  };
}

interface UpcomingPayoutsTableProps {
  payouts: Payout[];
  totalScheduled: number;
}

export function UpcomingPayoutsTable({
  payouts,
  totalScheduled,
}: UpcomingPayoutsTableProps) {
  const handleExport = () => {
    toast.success("Export Started", {
      description:
        "Your CSV export is being prepared and will download shortly.",
    });
  };

  const handleRetryPayout = (id: string) => {
    toast.success("Payout Retried", {
      description: "The failed payout has been queued for retry.",
    });
  };

  return (
    <div className="relative group">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 via-slate-700/5 to-slate-900/10 rounded-3xl blur-2xl group-hover:from-slate-700/20 group-hover:via-slate-600/10 group-hover:to-slate-800/20 transition-all duration-700"></div>

      <Card className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 border border-slate-700/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>

        <CardHeader className="relative border-b border-slate-700/20 bg-gradient-to-r from-slate-900/50 to-slate-800/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Upcoming Payouts
              </CardTitle>
              <CardDescription className="text-slate-400">
                Next scheduled payments and transactions
              </CardDescription>
            </div>

            <div className="flex items-center gap-3">
              {/* Enhanced Search Input */}
              <div className="relative group/search">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl opacity-0 group-focus-within/search:opacity-100 transition-all duration-300 blur-sm"></div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400 group-focus-within/search:text-emerald-400 transition-colors duration-300" />
                  <Input
                    placeholder="Search recipients..."
                    className="pl-10 w-64 bg-slate-800/50 border-slate-600/30 backdrop-blur-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:bg-slate-800/80 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Enhanced Filter Select */}
              <div className="relative group/filter">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 rounded-xl opacity-0 group-hover/filter:opacity-100 transition-all duration-300 blur-sm"></div>
                <Select>
                  <SelectTrigger className="relative w-36 bg-slate-800/50 border-slate-600/30 backdrop-blur-sm text-slate-200 hover:bg-slate-800/80 hover:border-teal-500/40 transition-all duration-300">
                    <Filter className="size-4 mr-2 text-teal-400" />
                    <SelectValue
                      placeholder="Filter"
                      className="text-slate-300"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900/95 border-slate-700/50 backdrop-blur-xl">
                    <SelectItem
                      value="all"
                      className="text-slate-200 focus:bg-slate-800/80"
                    >
                      All Status
                    </SelectItem>
                    <SelectItem
                      value="scheduled"
                      className="text-slate-200 focus:bg-slate-800/80"
                    >
                      Scheduled
                    </SelectItem>
                    <SelectItem
                      value="processing"
                      className="text-slate-200 focus:bg-slate-800/80"
                    >
                      Processing
                    </SelectItem>
                    <SelectItem
                      value="failed"
                      className="text-slate-200 focus:bg-slate-800/80"
                    >
                      Failed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Enhanced Export Button */}
              <div className="relative group/export">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-xl opacity-0 group-hover/export:opacity-100 transition-all duration-300 blur-sm"></div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleExport}
                  className="relative bg-slate-800/50 border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/80 hover:border-amber-500/40 hover:scale-105 transition-all duration-300"
                >
                  <Download className="size-4 text-amber-400 group-hover/export:text-amber-300 transition-colors duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/20 hover:bg-slate-800/30">
                  <TableHead className="text-slate-300 font-medium">
                    Recipient
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Amount
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Currency
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Next Payout
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout, index) => (
                  <TableRow
                    key={payout.id}
                    className="border-slate-700/20 hover:bg-slate-800/40 group/row transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-medium text-slate-200 group-hover/row:text-slate-100 transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 flex items-center justify-center">
                          <span className="text-xs font-medium text-emerald-400">
                            {payout.payout.recipientName
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>
                        <span>{payout.payout.recipientName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-200 group-hover/row:text-slate-100 transition-colors duration-300">
                      <span className="font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        ${payout.payout.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-300 group-hover/row:text-slate-200 transition-colors duration-300">
                      <span className="px-2 py-1 bg-slate-700/30 border border-slate-600/30 rounded-lg text-xs font-medium">
                        {payout.payout.currency}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="relative">
                        <StatusBadge status="Scheduled" />
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300 group-hover/row:text-slate-200 transition-colors duration-300">
                      <time className="text-sm">
                        {new Date(payout.scheduledDate).toLocaleDateString()}
                      </time>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-slate-700/50 hover:scale-105 transition-all duration-300 opacity-0 group-hover/row:opacity-100"
                          >
                            <MoreHorizontal className="size-4 text-slate-400 hover:text-slate-200 transition-colors duration-300" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-slate-900/95 border-slate-700/50 backdrop-blur-xl"
                        >
                          <DropdownMenuItem className="text-slate-200 focus:bg-slate-800/80">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-200 focus:bg-slate-800/80">
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRetryPayout(payout.id)}
                            className="text-teal-400 focus:bg-slate-800/80 focus:text-teal-300"
                          >
                            Retry
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-rose-400 focus:bg-slate-800/80 focus:text-rose-300">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Enhanced Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-700/20 bg-gradient-to-r from-slate-900/30 to-slate-800/20">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="text-emerald-400 font-medium">
                {payouts.length}
              </span>{" "}
              of{" "}
              <span className="text-teal-400 font-medium">
                {totalScheduled}
              </span>{" "}
              scheduled payouts
            </p>
            <div className="relative group/history">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded-xl opacity-0 group-hover/history:opacity-100 transition-all duration-300 blur-sm"></div>
              <Button
                variant="outline"
                className="relative bg-slate-800/50 border-slate-600/30 backdrop-blur-sm text-slate-200 hover:bg-slate-700/80 hover:border-slate-500/50 hover:text-slate-100 hover:scale-105 transition-all duration-300"
              >
                View All History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
