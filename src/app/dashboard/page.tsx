"use client";

import React, { useState, useMemo } from "react";
import { PiggyBank } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { BalanceCards } from "@/components/dashboard/balance-cards";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { AddTransactionDialog } from "@/components/dashboard/add-transaction-dialog";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { useTransactions } from "@/context/transactions-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { transactions } = useTransactions();

  const periodSavings = useMemo(() => {
    let savings = 0;
    for (const t of transactions) {
      if (t.category === "Ahorros") {
        savings += t.amount;
      }
    }
    return savings;
  }, [transactions]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader onAddTransaction={() => setIsAddDialogOpen(true)} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <BalanceCards />
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <TransactionsTable />
            </div>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ahorros del Período</CardTitle>
                    <PiggyBank className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-500">
                      {formatCurrency(periodSavings)}
                    </div>
                    <p className="text-xs text-muted-foreground">Suma de tus aportes a ahorros este mes.</p>
                  </CardContent>
                </Card>
                <ExpenseChart />
                <OverviewChart />
              </div>
            </div>
          </div>
        </main>
      </div>
      <AddTransactionDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}
