export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: Category;
};

export const categories = [
  "Housing",
  "Food",
  "Transport",
  "Entertainment",
  "Health",
  "Shopping",
  "Income",
  "Other",
] as const;

export type Category = (typeof categories)[number];

export const mockTransactions: Transaction[] = [
  { id: "1", date: new Date("2024-07-01"), description: "Salary", amount: 3000, type: "income", category: "Income" },
  { id: "2", date: new Date("2024-07-01"), description: "Rent", amount: 1200, type: "expense", category: "Housing" },
  { id: "3", date: new Date("2024-07-03"), description: "Groceries", amount: 150.75, type: "expense", category: "Food" },
  { id: "4", date: new Date("2024-07-05"), description: "Metro Pass", amount: 55, type: "expense", category: "Transport" },
  { id: "5", date: new Date("2024-07-08"), description: "Freelance Project", amount: 500, type: "income", category: "Income" },
  { id: "6", date: new Date("2024-07-10"), description: "Dinner with friends", amount: 80, type: "expense", category: "Food" },
  { id: "7", date: new Date("2024-07-12"), description: "Movie tickets", amount: 30, type: "expense", category: "Entertainment" },
  { id: "8", date: new Date("2024-07-15"), description: "New shoes", amount: 120, type: "expense", category: "Shopping" },
  { id: "9", date: new Date("2024-07-20"), description: "Pharmacy", amount: 45.50, type: "expense", category: "Health" },
  { id: "10", date: new Date("2024-07-22"), description: "Internet Bill", amount: 60, type: "expense", category: "Housing" },
  { id: "11", date: new Date("2024-07-25"), description: "Stock dividend", amount: 75, type: "income", category: "Income" },
];
