
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { type Transaction, mockTransactions, Category, savingsGoals, type SavingsGoal } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  initialBalance: number;
  totalAccumulatedSavings: number;
  allSavingsGoals: SavingsGoal[];
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [userTransactions, setUserTransactions] = useState<Transaction[]>(mockTransactions);
  const initialBalance = 200000;
  const totalAccumulatedSavings = 250000;
  const allSavingsGoals = savingsGoals;
  const { toast } = useToast();

  const transactions = useMemo(() => {
    const previousBalanceTransaction: Transaction = {
      id: "initial-balance",
      date: new Date("2025/07/01"), // First day of the mock data month
      description: "Saldo del mes anterior",
      amount: initialBalance,
      type: "income",
      category: "Ingresos",
    };
    return [previousBalanceTransaction, ...userTransactions].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [userTransactions, initialBalance]);


  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setUserTransactions((prev) => [...prev, newTransaction]);
    toast({
      title: "Transacción Añadida",
      description: `Se añadió "${newTransaction.description}" correctamente.`,
    });
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setUserTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
     toast({
      title: "Transacción Actualizada",
      description: `Se actualizó "${updatedTransaction.description}" correctamente.`,
    });
  };

  const deleteTransaction = (id: string) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    setUserTransactions((prev) => prev.filter((t) => t.id !== id));
    if (transactionToDelete) {
        toast({
            title: "Transacción Eliminada",
            description: `Se eliminó "${transactionToDelete.description}" correctamente.`,
            variant: "destructive"
        });
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        initialBalance,
        totalAccumulatedSavings,
        allSavingsGoals,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error("useTransactions debe ser usado dentro de un TransactionsProvider");
  }
  return context;
};
