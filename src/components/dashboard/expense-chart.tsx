"use client";

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '@/context/transactions-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { type ChartConfig } from "@/components/ui/chart";

const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f'];

export function ExpenseChart() {
    const { transactions } = useTransactions();

    const expenseData = useMemo(() => {
        const categoryTotals: { [key: string]: number } = {};
        transactions.filter(t => t.type === 'expense').forEach(t => {
            if (categoryTotals[t.category]) {
                categoryTotals[t.category] += t.amount;
            } else {
                categoryTotals[t.category] = t.amount;
            }
        });

        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    }, [transactions]);
    
    const chartConfig = useMemo(() => {
        const config: ChartConfig = {};
        expenseData.forEach((item, index) => {
            config[item.name] = {
                label: item.name,
                color: COLORS[index % COLORS.length]
            };
        });
        return config;
    }, [expenseData]);

    if (expenseData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Distribución de Gastos</CardTitle>
                    <CardDescription>Un desglose de tus gastos por categoría.</CardDescription>
                </CardHeader>
                <CardContent className="flex h-[350px] w-full items-center justify-center">
                    <p className="text-muted-foreground">No hay datos de gastos para mostrar.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
                <CardDescription>Un desglose de tus gastos por categoría.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Tooltip
                            cursor={{ fill: "hsl(var(--muted))" }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Categoría
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {payload[0].name}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                     <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Monto
                                                    </span>
                                                    <span className="font-bold">
                                                        {formatCurrency(payload[0].value as number)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Pie
                            data={expenseData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ paddingBottom: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
