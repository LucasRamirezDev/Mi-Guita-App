
"use client";

import React, { useState, useMemo } from "react";
import { PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { BalanceCards } from "@/components/dashboard/balance-cards";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { AddTransactionDialog } from "@/components/dashboard/add-transaction-dialog";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { useTransactions } from "@/context/transactions-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TransactionFilters } from "@/components/dashboard/transaction-filters";
import { type Transaction } from "@/lib/data";
import { SavingsGoals } from "@/components/dashboard/savings-goals";
import { ManageGoalsDialog } from "@/components/dashboard/manage-goals-dialog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export type Filters = {
  query: string;
  type: "all" | "income" | "expense";
  category: "all" | Transaction["category"];
};

export default function DashboardPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManageGoalsOpen, setIsManageGoalsOpen] = useState(false);
  const { transactions } = useTransactions();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    query: "",
    type: "all",
    category: "all",
  });

  const periodSavings = useMemo(() => {
    let savings = 0;
    const currentMonth = new Date("2025/07/01").getMonth();
    const currentYear = new Date("2025/07/01").getFullYear();

    for (const t of transactions) {
      const transactionDate = new Date(t.date);
      const isCurrentPeriod = transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;

      if (isCurrentPeriod && t.category === "Ahorros") {
        savings += t.amount;
      }
    }
    return savings;
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const currentMonth = new Date("2025/07/01").getMonth();
    const currentYear = new Date("2025/07/01").getFullYear();

    return transactions.filter(t => {
      const { query, type, category } = filters;
      
      const transactionDate = new Date(t.date);
      const isCurrentPeriod = transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;

      if (t.id === 'initial-balance') return false;
      if (!isCurrentPeriod) return false;

      const queryMatch = query.trim() === '' || t.description.toLowerCase().includes(query.toLowerCase());
      const typeMatch = type === 'all' || t.type === type;
      const categoryMatch = category === 'all' || t.category === category;

      return queryMatch && typeMatch && categoryMatch;
    });
  }, [transactions, filters]);
  
  const toggleBalanceVisibility = () => setIsBalanceVisible(prev => !prev);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader 
          onAddTransaction={() => setIsAddDialogOpen(true)}
          onManageGoals={() => setIsManageGoalsOpen(true)}
          isBalanceVisible={isBalanceVisible}
          onToggleBalanceVisibility={toggleBalanceVisibility}
        />
        <motion.main 
          className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <BalanceCards isBalanceVisible={isBalanceVisible} />
          </motion.div>
           <motion.div variants={itemVariants}>
            <TransactionFilters onFiltersChange={setFilters} />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <TransactionsTable transactions={filteredTransactions} />
            </motion.div>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
                <motion.div variants={itemVariants}>
                  <SavingsGoals />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ahorros del Período</CardTitle>
                      <PiggyBank className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-500">
                        {isBalanceVisible ? formatCurrency(periodSavings) : "•••••"}
                      </div>
                      <p className="text-xs text-muted-foreground">Suma de tus aportes a ahorros este mes.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ExpenseChart />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <OverviewChart />
                </motion.div>
            </div>
          </div>
        </motion.main>
      </div>
      <AddTransactionDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <ManageGoalsDialog
        isOpen={isManageGoalsOpen}
        onOpenChange={setIsManageGoalsOpen}
      />
    </>
  );
}
