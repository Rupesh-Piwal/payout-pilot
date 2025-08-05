"use client";

import type * as React from "react";
import { useRouter } from "next/navigation";
import { Calendar, DollarSign, Send, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { createPayoutFromObject } from "@/lib/actions/schedule";

interface PayoutFormProps {
  formData: {
    recipientName: string;
    recipientEmail: string;
    walletAddress: string;
    amount: string;
    currency: "USD" | "EUR" | "GBP" | "BTC" | "ETH" | "USDC";
    frequency: "one-time" | "weekly" | "monthly" | "quarterly";
    startDate: string;
    endDate: string;
    description: string;
    notifyRecipient: boolean;
    autoRetry: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export function PayoutForm({ formData, setFormData }: PayoutFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    startTransition(async () => {
      try {
        const result = await createPayoutFromObject(formData);

        if (result.success) {
          toast.success("Payout Scheduled", {
            description: result.message,
          });
          router.push("/"); // Redirect to payouts list or dashboard
        } else {
          if (result.details) {
            // Handle Zod validation errors
            const newErrors: Record<string, string> = {};
            result.details.forEach((error: any) => {
              if (error.path.length > 0) {
                newErrors[error.path[0]] = error.message;
              }
            });
            setErrors(newErrors);
            toast.error("Validation Error", {
              description: "Please check the form fields and try again.",
            });
          } else {
            toast.error("Error", {
              description: result.error || "Failed to schedule payout",
            });
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Error", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    });
  };

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Payout Details</CardTitle>
        <CardDescription>
          Fill in the details for your scheduled payout
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="size-5" />
              Recipient Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      recipientName: e.target.value,
                    }))
                  }
                  placeholder="Enter recipient name"
                  required
                  className={errors.recipientName ? "border-red-500" : ""}
                />
                {errors.recipientName && (
                  <p className="text-sm text-red-600">{errors.recipientName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Email Address</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      recipientEmail: e.target.value,
                    }))
                  }
                  placeholder="recipient@example.com"
                  className={errors.recipientEmail ? "border-red-500" : ""}
                />
                {errors.recipientEmail && (
                  <p className="text-sm text-red-600">
                    {errors.recipientEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Wallet/Bank Address *</Label>
              <Input
                id="walletAddress"
                value={formData.walletAddress}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    walletAddress: e.target.value,
                  }))
                }
                placeholder="0x... or bank account details"
                required
                className={errors.walletAddress ? "border-red-500" : ""}
              />
              {errors.walletAddress && (
                <p className="text-sm text-red-600">{errors.walletAddress}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="size-5" />
              Payment Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                  required
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount && (
                  <p className="text-sm text-red-600">{errors.amount}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData((prev: any) => ({ ...prev, currency: value }))
                  }
                >
                  <SelectTrigger
                    className={errors.currency ? "border-red-500" : ""}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                    <SelectItem value="ETH">ETH - Ethereum</SelectItem>
                    <SelectItem value="USDC">USDC - USD Coin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.currency && (
                  <p className="text-sm text-red-600">{errors.currency}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Schedule Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="size-5" />
              Schedule Settings
            </h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Frequency *</Label>
                <RadioGroup
                  value={formData.frequency}
                  onValueChange={(value) =>
                    setFormData((prev: any) => ({ ...prev, frequency: value }))
                  }
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">One-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarterly" id="quarterly" />
                    <Label htmlFor="quarterly">Quarterly</Label>
                  </div>
                </RadioGroup>
                {errors.frequency && (
                  <p className="text-sm text-red-600">{errors.frequency}</p>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    required
                    className={errors.startDate ? "border-red-500" : ""}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-600">{errors.startDate}</p>
                  )}
                </div>
                {formData.frequency !== "one-time" && (
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className={errors.endDate ? "border-red-500" : ""}
                    />
                    {errors.endDate && (
                      <p className="text-sm text-red-600">{errors.endDate}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Options</h3>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Add a note about this payout..."
                rows={3}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifyRecipient"
                  checked={formData.notifyRecipient}
                  onCheckedChange={(checked) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      notifyRecipient: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="notifyRecipient">
                  Notify recipient via email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoRetry"
                  checked={formData.autoRetry}
                  onCheckedChange={(checked) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      autoRetry: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="autoRetry">Auto-retry failed payments</Label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
            >
              <Send className="size-4 mr-2" />
              {isPending ? "Scheduling..." : "Schedule Payout"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
