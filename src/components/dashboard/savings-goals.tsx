"use client";

import { useTransactions } from "@/context/transactions-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { Target } from "lucide-react";
import { useMemo } from "react";

// For this mockup, we'll use a hardcoded goal.
const savingsGoal = {
  name: "Vacaciones en la Costa",
  target: 1000000,
};

export function SavingsGoals() {
  const { transactions, totalAccumulatedGoals } = useTransactions();

  const currentPeriodGoalsSavings = useMemo(() => {
    return transactions
      .filter(t => t.category === "Metas")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);
  
  const totalSavingsForGoal = totalAccumulatedGoals + currentPeriodGoalsSavings;
  const progressPercentage = (totalSavingsForGoal / savingsGoal.target) * 100;
  const remainingAmount = savingsGoal.target - totalSavingsForGoal;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Meta de Ahorro</CardTitle>
            <Target className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>Tu progreso para alcanzar tus objetivos financieros.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <p className="font-semibold">{savingsGoal.name}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(savingsGoal.target)}</p>
            </div>
            <Progress value={progressPercentage} />
            <div className="flex justify-between text-sm">
                <span className="font-medium text-primary">
                    Ahorrado: {formatCurrency(totalSavingsForGoal)}
                </span>
                 <span className="text-muted-foreground">
                    Falta: {formatCurrency(remainingAmount > 0 ? remainingAmount : 0)}
                </span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
