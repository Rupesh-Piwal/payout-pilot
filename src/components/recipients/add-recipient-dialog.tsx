"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddRecipientDialog() {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Recipient Added", {
      description: "New recipient has been added successfully.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="size-4 mr-2" />
          Add Recipient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Recipient</DialogTitle>
          <DialogDescription>
            Add a new recipient to your payout list. You can schedule payments to them later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter recipient name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="recipient@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="wallet">Wallet/Bank Address</Label>
              <Input id="wallet" placeholder="0x... or bank account details" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Add Recipient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
