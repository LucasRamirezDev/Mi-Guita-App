
"use client";

import { useMemo } from "react";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/context/transactions-context";
import { formatCurrency } from "@/lib/utils";

export function BalanceCards() {
  const { transactions, initialBalance } = useTransactions();

  const { totalIncome, totalExpenses } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    for (const t of transactions) {
      if (t.type === "income") {
        income += t.amount;
      } else {
        expenses += t.amount;
      }
    }
    return { totalIncome: income, totalExpenses: expenses };
  }, [transactions]);

  const currentBalance = initialBalance + totalIncome - totalExpenses;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Ahorrado</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(initialBalance)}
          </div>
          <p className="text-xs text-muted-foreground">Dinero ahorrado del período anterior.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">Total de ingresos recibidos</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">Total de gastos pagados</p>
        </CardContent>
      </Card>
      <Card className="bg-primary/10 border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Actual</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(currentBalance)}
          </div>
           <p className="text-xs text-muted-foreground">Tu resumen financiero</p>
        </CardContent>
      </Card>
    </div>
  );
}
