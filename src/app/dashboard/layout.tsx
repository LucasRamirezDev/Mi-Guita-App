import { TransactionsProvider } from "@/context/transactions-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TransactionsProvider>{children}</TransactionsProvider>;
}
