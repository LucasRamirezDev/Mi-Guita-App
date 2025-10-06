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
          <DialogTitle>Añadir Transacción</DialogTitle>
          <DialogDescription>
            Introduce los detalles de tu nueva transacción a continuación.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TransactionForm onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
