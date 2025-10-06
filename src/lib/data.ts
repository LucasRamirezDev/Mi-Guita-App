export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: Category;
};

export const categories = [
  "Vivienda",
  "Comida",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Compras",
  "Ingresos",
  "Otros",
] as const;

export type Category = (typeof categories)[number];

export const mockTransactions: Transaction[] = [
  { id: "1", date: new Date("2024/07/01"), description: "Salario", amount: 850000, type: "income", category: "Ingresos" },
  { id: "2", date: new Date("2024/07/01"), description: "Alquiler", amount: 350000, type: "expense", category: "Vivienda" },
  { id: "3", date: new Date("2024/07/03"), description: "Supermercado (semanal)", amount: 75500, type: "expense", category: "Comida" },
  { id: "4", date: new Date("2024/07/05"), description: "Carga SUBE", amount: 8000, type: "expense", category: "Transporte" },
  { id: "5", date: new Date("2024/07/08"), description: "Proyecto freelance", amount: 150000, type: "income", category: "Ingresos" },
  { id: "6", date: new Date("2024/07/10"), description: "Cena con amigos", amount: 25000, type: "expense", category: "Comida" },
  { id: "7", date: new Date("2024/07/12"), description: "Entradas de cine", amount: 18000, type: "expense", category: "Entretenimiento" },
  { id: "8", date: new Date("2024/07/15"), description: "Zapatillas", amount: 95000, type: "expense", category: "Compras" },
  { id: "9", date: new Date("2024/07/20"), description: "Consulta médica", amount: 15000, type: "expense", category: "Salud" },
  { id: "10", date: new Date("2024/07/22"), description: "Factura de internet y cable", amount: 28000, type: "expense", category: "Vivienda" },
  { id: "11", date: new Date("2024/07/25"), description: "Venta de item usado", amount: 45000, type: "income", category: "Ingresos" },
].sort((a, b) => b.date.getTime() - a.date.getTime());