
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Landmark, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/context/transactions-context";
import { formatCurrency } from "@/lib/utils";

type BalanceCardsProps = {
  isBalanceVisible: boolean;
};

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

export function BalanceCards({ isBalanceVisible }: BalanceCardsProps) {
  const { transactions, initialBalance, totalAccumulatedSavings } = useTransactions();

  const { totalIncome, totalExpenses, periodSavings } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let savings = 0;
    
    for (const t of transactions.filter(t => t.id !== 'initial-balance')) {
      if (t.type === "income") {
        income += t.amount;
      } else {
        expenses += t.amount;
        if (t.category === "Ahorros") {
          savings += t.amount;
        }
      }
    }
    return { totalIncome: income, totalExpenses: expenses, periodSavings: savings };
  }, [transactions]);
  
  const totalIncomeWithInitial = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const currentBalance = totalIncomeWithInitial - totalExpenses;
  
  const balancePlaceholder = "•••••";

  const cards = [
    { title: "Saldo del Mes Anterior", value: initialBalance, icon: Wallet, color: "", description: "Dinero disponible al iniciar el período." },
    { title: "Ingresos Totales", value: totalIncomeWithInitial, icon: ArrowUpCircle, color: "text-green-500", description: "Total de ingresos recibidos" },
    { title: "Gastos Totales", value: totalExpenses, icon: ArrowDownCircle, color: "text-red-500", description: "Total de gastos pagados" },
    { title: "Saldo Actual", value: currentBalance, icon: DollarSign, color: "text-primary", description: "Tu resumen financiero", highlight: true },
    { title: "Ahorros Totales", value: totalAccumulatedSavings + periodSavings, icon: Landmark, color: "", description: "Tu fondo de ahorro total." },
  ];

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
