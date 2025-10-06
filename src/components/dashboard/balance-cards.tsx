
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Landmark, Wallet, PiggyBank, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "@/context/transactions-context";
import { formatCurrency } from "@/lib/utils";

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

type BalanceCardsProps = {
  isBalanceVisible: boolean;
};

export function BalanceCards({ isBalanceVisible }: BalanceCardsProps) {
  const { transactions, initialBalance, totalAccumulatedSavings, totalAccumulatedGoals } = useTransactions();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { totalIncome, totalExpenses, periodSavings, periodGoals } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let savings = 0;
    let goals = 0;
    
    const currentMonth = new Date("2025/07/01").getMonth();
    const currentYear = new Date("2025/07/01").getFullYear();

    for (const t of transactions.filter(t => t.id !== 'initial-balance')) {
      const transactionDate = new Date(t.date);
      const isCurrentPeriod = transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
      
      if (!isCurrentPeriod) continue;

      if (t.type === "income") {
        income += t.amount;
      } else { // expense
        expenses += t.amount;
        if (t.category === "Ahorros") {
          savings += t.amount;
        } else if (t.category === "Metas") {
          goals += t.amount;
        }
      }
    }
    return { totalIncome: income, totalExpenses: expenses, periodSavings: savings, periodGoals: goals };
  }, [transactions]);
  
  const totalIncomeWithInitial = initialBalance + totalIncome;
  const currentBalance = totalIncomeWithInitial - totalExpenses;
  
  const balancePlaceholder = "•••••";

  const cards = [
    { title: "Saldo Anterior", value: initialBalance, icon: Wallet, color: "", description: "Dinero disponible al iniciar." },
    { title: "Ingresos del Mes", value: totalIncome, icon: ArrowUpCircle, color: "text-green-500", description: "Total de ingresos recibidos." },
    { title: "Gastos del Mes", value: totalExpenses, icon: ArrowDownCircle, color: "text-red-500", description: "Total de gastos y ahorros." },
    { title: "Saldo Actual", value: currentBalance, icon: DollarSign, color: "text-primary", description: "Tu resumen financiero.", highlight: true },
    { title: "Ahorro General Total", value: totalAccumulatedSavings + periodSavings, icon: PiggyBank, color: "", description: "Tu fondo de ahorro general." },
  ];

  if (!isMounted) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-1/2" />
              <Skeleton className="mt-2 h-3 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, index) => (
        <motion.div key={index} variants={cardVariants}>
          <Card className={card.highlight ? "bg-primary/10 border-primary" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color || 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {isBalanceVisible ? formatCurrency(card.value) : balancePlaceholder}
              </div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
