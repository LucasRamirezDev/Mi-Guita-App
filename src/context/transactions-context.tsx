
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { type Transaction, mockTransactions } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  initialBalance: number;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const initialBalance = 5500;
  const { toast } = useToast();

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions((prev) => [newTransaction, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
    toast({
      title: "Transacción Añadida",
      description: `Se añadió "${newTransaction.description}" correctamente.`,
    });
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
    );
     toast({
      title: "Transacción Actualizada",
      description: `Se actualizó "${updatedTransaction.description}" correctamente.`,
    });
  };

  const deleteTransaction = (id: string) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
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
