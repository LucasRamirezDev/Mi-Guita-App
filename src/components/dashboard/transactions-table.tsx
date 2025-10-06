
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransactions } from "@/context/transactions-context";
import { type Transaction } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditTransactionDialog } from "./edit-transaction-dialog";

const rowVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
  exit: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.2,
    },
  },
};


export function TransactionsTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deletingTransactionId) {
        deleteTransaction(deletingTransactionId);
        setDeletingTransactionId(null);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
          <CardDescription>
            Una lista de tus ingresos y gastos recientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descripción</TableHead>
                <TableHead className="hidden sm:table-cell">Categoría</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="w-[50px]">
                    <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <AnimatePresence>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((t, i) => (
                    <motion.tr
                      key={t.id}
                      custom={i}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell>
                        <div className="font-medium">{t.description}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{format(t.date, "PP", { locale: es })}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{t.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{format(t.date, "PPP", { locale: es })}</TableCell>
                      <TableCell
                        className={cn(
                          "text-right font-medium",
                          t.type === "income" ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {t.type === "income" ? "+" : "-"}
                        {formatCurrency(t.amount)}
                      </TableCell>
                      <TableCell>
                        {t.id !== 'initial-balance' && (
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  <DropdownMenuItem onSelect={() => setEditingTransaction(t)}>
                                      <Edit className="mr-2 h-4 w-4"/>
                                      Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={() => setDeletingTransactionId(t.id)} className="text-red-500">
                                      <Trash2 className="mr-2 h-4 w-4"/>
                                      Eliminar
                                  </DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Aún no hay transacciones.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </AnimatePresence>
          </Table>
        </CardContent>
      </Card>
      
      {editingTransaction && (
        <EditTransactionDialog 
            isOpen={!!editingTransaction}
            onOpenChange={(isOpen) => !isOpen && setEditingTransaction(null)}
            transaction={editingTransaction}
        />
      )}

      <AlertDialog open={!!deletingTransactionId} onOpenChange={(isOpen) => !isOpen && setDeletingTransactionId(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutely seguro?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente esta transacción.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
