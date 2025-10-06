
"use client";

import { useTransactions } from "@/context/transactions-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { Target } from "lucide-react";
import { useMemo } from "react";
import { type SavingsGoal } from "@/lib/data";

const GoalCard = ({ goal }: { goal: SavingsGoal }) => {
  const { transactions } = useTransactions();

  const currentPeriodGoalsSavings = useMemo(() => {
    return transactions
      .filter(t => t.category === "Metas" && t.goalId === goal.id)
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions, goal.id]);

  const totalSavingsForGoal = goal.accumulated + currentPeriodGoalsSavings;
  const progressPercentage = (totalSavingsForGoal / goal.target) * 100;
  const remainingAmount = goal.target - totalSavingsForGoal;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <p className="font-semibold">{goal.name}</p>
        <p className="text-sm text-muted-foreground">{formatCurrency(goal.target)}</p>
      </div>
      <Progress value={progressPercentage} aria-label={`Progreso de la meta ${goal.name}`} />
      <div className="flex justify-between text-sm">
        <span className="font-medium text-primary">
          Ahorrado: {formatCurrency(totalSavingsForGoal)}
        </span>
        <span className="text-muted-foreground">
          Falta: {formatCurrency(remainingAmount > 0 ? remainingAmount : 0)}
        </span>
      </div>
    </div>
  );
};


export function SavingsGoals() {
  const { allSavingsGoals } = useTransactions();

  if (allSavingsGoals.length === 0) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Metas de Ahorro</CardTitle>
                    <Target className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>Tu progreso para alcanzar tus objetivos financieros.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No has creado ninguna meta todavía.</p>
                <p className="text-sm text-muted-foreground mt-2">Usa el botón "Gestionar Metas" para empezar.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Metas de Ahorro</CardTitle>
            <Target className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>Tu progreso para alcanzar tus objetivos financieros.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {allSavingsGoals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </CardContent>
    </Card>
  );
}
