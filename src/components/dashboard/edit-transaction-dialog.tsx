"use client";

import { useTransactions } from "@/context/transactions-context";
import { type Transaction } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TransactionForm, TransactionFormValues } from "./transaction-form";

type EditTransactionDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  transaction: Transaction;
};

export function EditTransactionDialog({
  isOpen,
  onOpenChange,
  transaction,
}: EditTransactionDialogProps) {
  const { updateTransaction } = useTransactions();

  const handleSubmit = (values: TransactionFormValues) => {
    updateTransaction({ ...values, id: transaction.id });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Transacción</DialogTitle>
          <DialogDescription>
            Actualiza los detalles de tu transacción.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TransactionForm onSubmit={handleSubmit} defaultValues={transaction} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
