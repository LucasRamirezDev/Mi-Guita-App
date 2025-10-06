
"use client";

import { useMemo } from "react";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Landmark, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/context/transactions-context";
import { formatCurrency } from "@/lib/utils";

type BalanceCardsProps = {
  isBalanceVisible: boolean;
};

export function BalanceCards({ isBalanceVisible }: BalanceCardsProps) {
  const { transactions, initialBalance, totalAccumulatedSavings } = useTransactions();

  const { totalIncome, totalExpenses, periodSavings } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let savings = 0;
    // We exclude the initialBalance from the income calculation here, as it's already part of the transactions
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

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
      <Card className="xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo del Mes Anterior</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isBalanceVisible ? formatCurrency(initialBalance) : balancePlaceholder}
          </div>
          <p className="text-xs text-muted-foreground">Dinero disponible al iniciar el período.</p>
        </CardContent>
      </Card>
      <Card className="xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {isBalanceVisible ? formatCurrency(totalIncomeWithInitial) : balancePlaceholder}
          </div>
          <p className="text-xs text-muted-foreground">Total de ingresos recibidos</p>
        </CardContent>
      </Card>
      <Card className="xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {isBalanceVisible ? formatCurrency(totalExpenses) : balancePlaceholder}
          </div>
          <p className="text-xs text-muted-foreground">Total de gastos pagados</p>
        </CardContent>
      </Card>
      <Card className="bg-primary/10 border-primary xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Actual</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {isBalanceVisible ? formatCurrency(currentBalance) : balancePlaceholder}
          </div>
           <p className="text-xs text-muted-foreground">Tu resumen financiero</p>
        </CardContent>
      </Card>
       <Card className="xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ahorros Totales</CardTitle>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isBalanceVisible ? formatCurrency(totalAccumulatedSavings + periodSavings) : balancePlaceholder}
          </div>
          <p className="text-xs text-muted-foreground">Tu fondo de ahorro total.</p>
        </CardContent>
      </Card>
    </div>
  );
}
