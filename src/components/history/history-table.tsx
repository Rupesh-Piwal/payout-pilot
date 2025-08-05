"use client"

import * as React from "react"
import { ArrowUpDown, Download, Filter, MoreHorizontal, RefreshCw, Search } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"

interface PayoutHistoryItem {
  id: number
  recipient: string
  amount: number
  currency: string
  frequency: string
  status: string
  date: string
  transactionId: string
  wallet: string
  fee: number
  failureReason?: string
}

interface HistoryTableProps {
  payouts: PayoutHistoryItem[]
}

export function HistoryTable({ payouts }: HistoryTableProps) {
  const [selectedPayouts, setSelectedPayouts] = React.useState<number[]>([])
  const [sortBy, setSortBy] = React.useState("date")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPayouts(filteredPayouts.map((p) => p.id))
    } else {
      setSelectedPayouts([])
    }
  }

  const handleSelectPayout = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedPayouts((prev) => [...prev, id])
    } else {
      setSelectedPayouts((prev) => prev.filter((p) => p !== id))
    }
  }

  const handleBulkExport = () => {
    toast.success("Export Started", {
      description: `Exporting ${selectedPayouts.length} selected payouts to CSV.`,
    })
  }

  const handleBulkRefund = () => {
    toast.success("Refund Initiated", {
      description: `Refund process started for ${selectedPayouts.length} selected payouts.`,
    })
  }

  const handleRetryPayout = (id: number) => {
    toast.success("Payout Retried", {
      description: "The failed payout has been queued for retry.",
    })
  }

  const handleExportAll = () => {
    toast.success("Export Started", {
      description: "Your complete payout history is being exported to CSV.",
    })
  }

  const filteredPayouts = payouts
    .filter((payout) => {
      if (statusFilter !== "all" && payout.status.toLowerCase() !== statusFilter) {
        return false
      }
      if (searchQuery && !payout.recipient.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]

      if (sortBy === "date") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Complete record of all payout transactions</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {selectedPayouts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedPayouts.length} selected</span>
                <Button variant="outline" size="sm" onClick={handleBulkExport}>
                  <Download className="size-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkRefund}>
                  <RefreshCw className="size-4 mr-2" />
                  Refund
                </Button>
              </div>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search recipients..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <Filter className="size-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleExportAll}>
              <Download className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedPayouts.length === filteredPayouts.length && filteredPayouts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSortBy("recipient")
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Recipient
                  <ArrowUpDown className="size-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSortBy("amount")
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Amount
                  <ArrowUpDown className="size-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSortBy("date")
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Date
                  <ArrowUpDown className="size-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayouts.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPayouts.includes(payout.id)}
                    onCheckedChange={(checked) => handleSelectPayout(payout.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">{payout.recipient}</TableCell>
                <TableCell>${payout.amount.toLocaleString()}</TableCell>
                <TableCell>{payout.currency}</TableCell>
                <TableCell>
                  <StatusBadge status={payout.status} />
                </TableCell>
                <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-mono text-sm">{payout.transactionId}</TableCell>
                <TableCell>${payout.fee.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Copy Transaction ID</DropdownMenuItem>
                      {payout.status === "Failed" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRetryPayout(payout.id)}>
                            Retry Payment
                          </DropdownMenuItem>
                        </>
                      )}
                      {payout.status === "Sent" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Request Refund</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPayouts.length} of {payouts.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
