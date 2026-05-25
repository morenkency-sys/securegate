import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Dashboard | SecureGate",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ 
        fontFamily: "var(--typography-headline-medium-font-family)", 
        fontSize: "var(--typography-headline-medium-font-size)",
        fontWeight: "var(--typography-headline-medium-font-weight)",
        color: "var(--color-on-background)",
        marginBottom: "24px"
      }}>
        Welcome, {session?.user?.name || "User"}!
      </h1>
      
      <Card title="Your Account" description="Manage your SecureGate account securely.">
        <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "var(--color-surface-variant)", borderRadius: "8px" }}>
          <p style={{ marginBottom: "8px" }}><strong>Name:</strong> {session?.user?.name}</p>
          <p style={{ marginBottom: "8px" }}><strong>Email:</strong> {session?.user?.email}</p>
          <p><strong>Status:</strong> <span style={{ color: "green", fontWeight: "bold" }}>Verified</span></p>
        </div>
      </Card>
    </div>
  );
}
