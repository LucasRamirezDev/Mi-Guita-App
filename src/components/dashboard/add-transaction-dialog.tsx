"use client";

import { useTransactions } from "@/context/transactions-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TransactionForm, TransactionFormValues } from "./transaction-form";

type AddTransactionDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddTransactionDialog({
  isOpen,
  onOpenChange,
}: AddTransactionDialogProps) {
  const { addTransaction } = useTransactions();

  const handleSubmit = (values: TransactionFormValues) => {
    addTransaction(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your new transaction below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TransactionForm onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
