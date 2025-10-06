"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { BalanceCards } from "@/components/dashboard/balance-cards";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { AddTransactionDialog } from "@/components/dashboard/add-transaction-dialog";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { OverviewChart } from "@/components/dashboard/overview-chart";

export default function DashboardPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader onAddTransaction={() => setIsAddDialogOpen(true)} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <BalanceCards />
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 xl:col-span-2">
              <TransactionsTable />
            </div>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
              <ExpenseChart />
              <OverviewChart />
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
