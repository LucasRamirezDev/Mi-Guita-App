
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/transactions-context";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre de la meta debe tener al menos 3 caracteres.",
  }),
  target: z.coerce.number().positive({ message: "El objetivo debe ser un número positivo." }),
});

type GoalFormValues = z.infer<typeof formSchema>;

type ManageGoalsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ManageGoalsDialog({ isOpen, onOpenChange }: ManageGoalsDialogProps) {
  const { allSavingsGoals, addGoal, deleteGoal } = useTransactions();

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      target: 0,
    },
  });

  const handleSubmit = (values: GoalFormValues) => {
    addGoal(values);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gestionar Metas de Ahorro</DialogTitle>
          <DialogDescription>
            Añade nuevas metas o finaliza las existentes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Metas Actuales</h3>
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
              {allSavingsGoals.length > 0 ? (
                allSavingsGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{goal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Objetivo: {formatCurrency(goal.target)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Finalizar meta</span>
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No tienes metas activas.</p>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Crear Nueva Meta</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Meta</FormLabel>
                      <FormControl>
                        <Input placeholder="ej. Comprar un auto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monto Objetivo</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Añadir Meta
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
