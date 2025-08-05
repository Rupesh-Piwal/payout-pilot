"use server";

import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"; // For validation

// Validation schema for payout data
const PayoutSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required").max(255),
  recipientEmail: z
    .string()
    .email("Invalid email format")
    .optional()
    .or(z.literal("")),
  walletAddress: z.string().min(1, "Wallet/Bank address is required").max(500),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Amount must be a positive number"),
  currency: z.enum(["USD", "EUR", "GBP", "BTC", "ETH", "USDC"]),
  frequency: z.enum(["one-time", "weekly", "monthly", "quarterly"]),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date >= new Date();
    }, "Start date must be a valid future date"),
  endDate: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "End date must be a valid date"),
  description: z.string().max(1000).optional(),
  notifyRecipient: z.boolean(),
  autoRetry: z.boolean(),
});

export type PayoutFormData = z.infer<typeof PayoutSchema>;

export async function createPayout(formData: FormData) {
  try {
    // Extract and validate form data
    const rawData = {
      recipientName: formData.get("recipientName") as string,
      recipientEmail: formData.get("recipientEmail") as string,
      walletAddress: formData.get("walletAddress") as string,
      amount: formData.get("amount") as string,
      currency: formData.get("currency") as string,
      frequency: formData.get("frequency") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      description: formData.get("description") as string,
      notifyRecipient: formData.get("notifyRecipient") === "true",
      autoRetry: formData.get("autoRetry") === "true",
    };

    // Validate the data
    const validatedData = PayoutSchema.parse(rawData);

    // Convert amount to decimal for database storage
    const amountDecimal = parseFloat(validatedData.amount);

    const frequencyMap = {
      "one-time": "ONE_TIME",
      weekly: "WEEKLY",
      monthly: "MONTHLY",
      quarterly: "QUARTERLY",
    } as const;

    // Create payout record in database
    const payout = await prisma.payout.create({
      data: {
        recipientName: validatedData.recipientName,
        recipientEmail: validatedData.recipientEmail || null,
        walletAddress: validatedData.walletAddress,
        amount: amountDecimal,
        currency: validatedData.currency,
        frequency: frequencyMap[validatedData.frequency],
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        description: validatedData.description || null,
        notifyRecipient: validatedData.notifyRecipient,
        autoRetry: validatedData.autoRetry,
        status: "SCHEDULED", // Default status
        // Add userId if you have authentication
        // userId: getCurrentUserId(),
      },
    });
    console.log(payout);

    // If it's a recurring payout, create the schedule entries
    if (validatedData.frequency !== "one-time") {
      await createPayoutSchedule(payout.id, validatedData);
    }

    // Revalidate relevant pages
 
    revalidatePath("/dashboard");

    return {
      success: true,
      data: payout,
      message: `Payout of ${validatedData.amount} ${validatedData.currency} to ${validatedData.recipientName} has been scheduled.`,
    };
  } catch (error) {
    console.error("Error creating payout:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues,
      };
    }

    return {
      success: false,
      error: "Failed to create payout. Please try again.",
    };
  }
}

// Alternative function for direct object submission (for client components)
export async function createPayoutFromObject(data: PayoutFormData) {
  try {
    // Validate the data
    const validatedData = PayoutSchema.parse({
      ...data,
      currency: data.currency as typeof validatedData.currency,
      frequency: data.frequency as typeof validatedData.frequency,
    });

    // Convert amount to decimal for database storage
    const amountDecimal = parseFloat(validatedData.amount);

    const frequencyMap = {
      "one-time": "ONE_TIME",
      weekly: "WEEKLY",
      monthly: "MONTHLY",
      quarterly: "QUARTERLY",
    } as const;

    // Create payout record in database
    const payout = await prisma.payout.create({
      data: {
        recipientName: validatedData.recipientName,
        recipientEmail: validatedData.recipientEmail || null,
        walletAddress: validatedData.walletAddress,
        amount: amountDecimal,
        currency: validatedData.currency,
        frequency: frequencyMap[validatedData.frequency],
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        description: validatedData.description || null,
        notifyRecipient: validatedData.notifyRecipient,
        autoRetry: validatedData.autoRetry,
        status: "SCHEDULED",
        // Add userId if you have authentication
        // userId: getCurrentUserId(),
      },
    });

    // If it's a recurring payout, create the schedule entries
    if (validatedData.frequency !== "one-time") {
      await createPayoutSchedule(payout.id, validatedData);
    }

    // Revalidate relevant pages
    
    revalidatePath("/dashboard");

    return {
      success: true,
      data: payout,
      message: `Payout of ${validatedData.amount} ${validatedData.currency} to ${validatedData.recipientName} has been scheduled.`,
    };
  } catch (error) {
    console.error("Error creating payout:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues,
      };
    }

    return {
      success: false,
      error: "Failed to create payout. Please try again.",
    };
  }
}

// Helper function to create payout schedules for recurring payments
async function createPayoutSchedule(payoutId: string, data: PayoutFormData) {
  const startDate = new Date(data.startDate);
  const endDate = data.endDate ? new Date(data.endDate) : null;

  // Calculate next execution dates based on frequency
  const scheduleEntries = [];
  let currentDate = new Date(startDate);
  let executionCount = 0;
  const maxExecutions = 100; // Prevent infinite schedules

  while (executionCount < maxExecutions) {
    // Break if we've reached the end date
    if (endDate && currentDate > endDate) break;

    scheduleEntries.push({
      payoutId,
      scheduledDate: new Date(currentDate),
      status: "PENDING" as const,
    });

    // Calculate next date based on frequency
    switch (data.frequency) {
      case "weekly":
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case "monthly":
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "quarterly":
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      default:
        // For one-time, we shouldn't reach here, but break just in case
        break;
    }

    executionCount++;

    // For recurring without end date, limit to first year
    if (!endDate && executionCount >= 52) break;
  }

  // Create all schedule entries in batch
  if (scheduleEntries.length > 0) {
    await prisma.payoutSchedule.createMany({
      data: scheduleEntries,
    });
  }
}

// Additional utility functions for payout management

export async function getPayouts(userId?: string) {
  try {
    const payouts = await prisma.payout.findMany({
      where: userId ? { userId } : {},
      include: {
        schedules: {
          orderBy: { scheduledDate: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: payouts,
    };
  } catch (error) {
    console.error("Error fetching payouts:", error);
    return {
      success: false,
      error: "Failed to fetch payouts",
    };
  }
}

export async function updatePayoutStatus(payoutId: string, status: string) {
  const payoutStatusMap = {
    scheduled: "SCHEDULED",
    completed: "COMPLETED",
    failed: "FAILED",
  } as const;
  try {
    const payout = await prisma.payout.update({
      where: { id: payoutId },
      data: {
        status: payoutStatusMap[status as keyof typeof payoutStatusMap],
        updatedAt: new Date(),
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: payout,
    };
  } catch (error) {
    console.error("Error updating payout status:", error);
    return {
      success: false,
      error: "Failed to update payout status",
    };
  }
}

export async function deletePayout(payoutId: string) {
  try {
    // Delete associated schedules first
    await prisma.payoutSchedule.deleteMany({
      where: { payoutId },
    });

    // Delete the payout
    await prisma.payout.delete({
      where: { id: payoutId },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Payout deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting payout:", error);
    return {
      success: false,
      error: "Failed to delete payout",
    };
  }
}
