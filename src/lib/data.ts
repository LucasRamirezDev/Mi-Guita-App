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
  { id: "1", date: new Date("2024/07/01"), description: "Salario", amount: 3000, type: "income", category: "Ingresos" },
  { id: "2", date: new Date("2024/07/01"), description: "Alquiler", amount: 1200, type: "expense", category: "Vivienda" },
  { id: "3", date: new Date("2024/07/03"), description: "Comestibles", amount: 150.75, type: "expense", category: "Comida" },
  { id: "4", date: new Date("2024/07/05"), description: "Pase de metro", amount: 55, type: "expense", category: "Transporte" },
  { id: "5", date: new Date("2024/07/08"), description: "Proyecto freelance", amount: 500, type: "income", category: "Ingresos" },
  { id: "6", date: new Date("2024/07/10"), description: "Cena con amigos", amount: 80, type: "expense", category: "Comida" },
  { id: "7", date: new Date("2024/07/12"), description: "Entradas de cine", amount: 30, type: "expense", category: "Entretenimiento" },
  { id: "8", date: new Date("2024/07/15"), description: "Zapatos nuevos", amount: 120, type: "expense", category: "Compras" },
  { id: "9", date: new Date("2024/07/20"), description: "Farmacia", amount: 45.50, type: "expense", category: "Salud" },
  { id: "10", date: new Date("2024/07/22"), description: "Factura de internet", amount: 60, type: "expense", category: "Vivienda" },
  { id: "11", date: new Date("2024/07/25"), description: "Dividendo de acciones", amount: 75, type: "income", category: "Ingresos" },
].sort((a, b) => b.date.getTime() - a.date.getTime());
