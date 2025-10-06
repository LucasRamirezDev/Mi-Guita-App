"use client";

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '@/context/transactions-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function OverviewChart() {
    const { transactions } = useTransactions();

    const chartData = useMemo(() => {
        const { totalIncome, totalExpenses } = transactions.reduce(
            (acc, t) => {
                if (t.type === 'income') acc.totalIncome += t.amount;
                else acc.totalExpenses += t.amount;
                return acc;
            },
            { totalIncome: 0, totalExpenses: 0 }
        );
        return [{ name: 'Total', income: totalIncome, expenses: totalExpenses }];
    }, [transactions]);
    
    const chartConfig = {
        income: {
            label: "Ingresos",
            color: "hsl(var(--chart-1))",
        },
        expenses: {
            label: "Gastos",
            color: "hsl(var(--chart-5))",
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ingresos vs. Gastos</CardTitle>
                 <CardDescription>Un resumen de tus ingresos y gastos totales.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                         <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                         />
                         <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                         <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent 
                                formatter={(value) => formatCurrency(value as number)}
                            />} 
                         />
                         <Legend content={({ payload }) => {
                            return (
                                <div className="flex justify-center gap-4">
                                {payload?.map((entry) => {
                                    const config = chartConfig[entry.dataKey as keyof typeof chartConfig];
                                    return (
                                    <div key={entry.value} className="flex items-center gap-1.5 text-xs">
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
                                        <span>{config.label}</span>
                                    </div>
                                    )
                                })}
                                </div>
                            )
                            }} />
                         <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                         <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                    </BarChart>
                 </ChartContainer>
            </CardContent>
        </Card>
    );
}
