import { auth } from "@/auth";
import { DeleteAccountDialog } from "@/components/settings/delete-account-dialog";
import { PurchaseCreditsForm } from "@/components/settings/PurchaseCreditsForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import Decimal from "decimal.js";
import { eq } from "drizzle-orm";
import { AlertCircle, CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // If payment was successful, fetch the latest user data from the database
  // instead of relying on the session data which might be stale
  if (payment === "success" && session.user.id) {
    const [userData] = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id));

    if (userData) {
      session.user = {
        ...session.user,
        ...userData,
      };
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Payment Status Alerts */}
        {payment === "success" && (
          <Alert data-testid="payment-success-alert">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Payment successful! Your credits have been added to your account.
            </AlertDescription>
          </Alert>
        )}

        {payment === "cancelled" && (
          <Alert data-testid="payment-cancelled-alert">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Payment was cancelled. You can try again anytime.
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20" data-testid="profile-avatar">
                <AvatarImage
                  src={session.user.image || undefined}
                  alt={session.user.name || "User"}
                />
                <AvatarFallback className="text-2xl">
                  {session.user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold" data-testid="profile-name">
                  {session.user.name || "No name set"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Claim your Alpha Credits</CardTitle>
            <CardDescription>
              Claim free credits to power your AI-assisted resume building.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col w-full items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">
                Your Credit Amount:
              </span>{" "}
              <span className="font-semibold text-3xl">
                ${" "}
                {new Decimal(session.user.credits)
                  .div(100)
                  .toDecimalPlaces(2, Decimal.ROUND_DOWN)
                  .toFixed(2)}
              </span>
            </div>
            {session.user.alpha_credits_redeemed === false && (
              <>
                <PurchaseCreditsForm />
              </>
            )}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-destructive">
                Delete Account
              </h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <DeleteAccountDialog userEmail={session.user.email || ""} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
