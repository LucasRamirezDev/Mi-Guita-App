
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, Wallet, Percent, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeTransactions, type FinancialAnalysisOutput } from '@/ai/flows/financial-analyst-flow';
import { type Transaction } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type FinancialAnalysisProps = {
  transactions: Transaction[];
};

export function FinancialAnalysis({ transactions }: FinancialAnalysisProps) {
  const [analysis, setAnalysis] = useState<FinancialAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeTransactions(transactions);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError("Hubo un error al generar el análisis. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const AnalysisResult = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
    >
        <Alert className="mt-4 border-primary/50">
            <BrainCircuit className="h-4 w-4" />
            <AlertTitle className='font-bold'>Análisis Financiero IA</AlertTitle>
            <AlertDescription className="space-y-4 mt-2">
                <p className="text-sm text-muted-foreground italic">"{analysis?.insight}"</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-3">
                        <TrendingUp className="h-6 w-6 text-green-500" />
                        <span className="text-xs text-muted-foreground">Ingresos</span>
                        <span className="text-lg font-bold">{formatCurrency(analysis?.totalIncome ?? 0)}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-3">
                        <TrendingDown className="h-6 w-6 text-red-500" />
                        <span className="text-xs text-muted-foreground">Gastos</span>
                        <span className="text-lg font-bold">{formatCurrency(analysis?.totalExpenses ?? 0)}</span>
                    </div>
                     <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-3">
                        <Percent className="h-6 w-6 text-blue-500" />
                        <span className="text-xs text-muted-foreground">Tasa de Ahorro</span>
                        <span className="text-lg font-bold">{analysis?.savingsRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-3">
                        <Wallet className="h-6 w-6 text-amber-500" />
                        <span className="text-xs text-muted-foreground">Mayor Gasto</span>
                        <Badge variant="secondary" className="text-base">{analysis?.highestSpendingCategory}</Badge>
                    </div>
                </div>
            </AlertDescription>
        </Alert>
    </motion.div>
  );

  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center justify-center">
        <Button onClick={handleAnalysis} disabled={isLoading || transactions.length === 0}>
          <Lightbulb className="mr-2 h-4 w-4" />
          {isLoading ? "Analizando..." : "Obtener Análisis IA"}
        </Button>
        {transactions.length === 0 && <p className="text-xs text-muted-foreground mt-2">No hay transacciones para analizar.</p>}
        
        <AnimatePresence>
            {isLoading && (
                 <div className="mt-4 w-full space-y-4">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                 </div>
            )}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            {analysis && <AnalysisResult />}
        </AnimatePresence>

      </CardContent>
    </Card>
  );
}
