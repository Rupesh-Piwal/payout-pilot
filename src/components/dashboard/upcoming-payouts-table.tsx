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
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Upcoming Payouts</CardTitle>
            <CardDescription>Next scheduled payments</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search recipients..."
                className="pl-10 w-64"
              />
            </div>
            <Select>
              <SelectTrigger className="w-32">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleExport}>
              <Download className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Payout</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell className="font-medium">
                  {payout.payout.recipientName}
                </TableCell>
                <TableCell>${payout.payout.amount.toLocaleString()}</TableCell>
                <TableCell>{payout.payout.currency}</TableCell>
                <TableCell>
                  <StatusBadge status="Scheduled" />
                </TableCell>
                <TableCell>
                  {new Date(payout.scheduledDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRetryPayout(payout.id)}
                      >
                        Retry
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {payouts.length} of {totalScheduled} scheduled payouts
          </p>
          <Button variant="outline">View All History</Button>
        </div>
      </CardContent>
    </Card>
  );
}
