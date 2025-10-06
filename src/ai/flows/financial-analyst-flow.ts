'use server';
/**
 * @fileOverview Un agente de IA que analiza transacciones financieras.
 *
 * - analyzeTransactions - Una función que maneja el análisis financiero.
 * - FinancialAnalysisInput - El tipo de entrada para la función de análisis.
 * - FinancialAnalysisOutput - El tipo de retorno para la función de análisis.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { type Transaction } from '@/lib/data';

// Usamos z.any() para las transacciones porque el objeto Date no es serializable directamente a JSON
const FinancialAnalysisInputSchema = z.object({
    transactions: z.array(z.any()).describe("Un array de objetos de transacción para el período a analizar."),
});
export type FinancialAnalysisInput = z.infer<typeof FinancialAnalysisInputSchema>;

const FinancialAnalysisOutputSchema = z.object({
    highestSpendingCategory: z.string().describe("La categoría de gasto con el monto total más alto en el período."),
    totalIncome: z.number().describe("La suma de todos los ingresos en el período."),
    totalExpenses: z.number().describe("La suma de todos los gastos en el período."),
    savingsRate: z.number().describe("El porcentaje de ingresos que se ha ahorrado (ingresos - gastos) / ingresos * 100. Puede ser negativo si los gastos superan a los ingresos."),
    insight: z.string().describe("Un consejo o observación breve, útil y amigable (en español, máximo 25 palabras) basado en los datos, como felicitar por el ahorro o señalar el gasto principal."),
});
export type FinancialAnalysisOutput = z.infer<typeof FinancialAnalysisOutputSchema>;

export async function analyzeTransactions(input: Transaction[]): Promise<FinancialAnalysisOutput> {
  const serializableTransactions = input.map(t => ({
    ...t,
    date: t.date.toISOString(),
  }));
  return financialAnalystFlow({ transactions: serializableTransactions });
}

const prompt = ai.definePrompt({
  name: 'financialAnalystPrompt',
  input: { schema: FinancialAnalysisInputSchema },
  output: { schema: FinancialAnalysisOutputSchema },
  model: 'gemini-pro',
  prompt: `Eres "Mi Guita AI", un asistente financiero amigable y experto. Analiza la siguiente lista de transacciones del mes.

Transacciones:
{{{json transactions}}}

Calcula lo siguiente y responde únicamente con el objeto JSON:
1.  **highestSpendingCategory**: Identifica la categoría de GASTO (excluyendo "Ingresos", "Ahorros" y "Metas") que tuvo el mayor monto total gastado.
2.  **totalIncome**: Suma todos los montos de tipo 'income'.
3.  **totalExpenses**: Suma todos los montos de tipo 'expense'.
4.  **savingsRate**: Calcula la tasa de ahorro como ((totalIncome - totalExpenses) / totalIncome) * 100. Redondea a un decimal. Si totalIncome es 0, la tasa es 0.
5.  **insight**: Basado en los datos, genera una observación corta y útil en español (máximo 25 palabras). Por ejemplo, si la tasa de ahorro es positiva, felicita al usuario. Si es negativa, anímale. Si un gasto es muy alto, menciónalo de forma neutra.
`,
});

const financialAnalystFlow = ai.defineFlow(
  {
    name: 'financialAnalystFlow',
    inputSchema: FinancialAnalysisInputSchema,
    outputSchema: FinancialAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("La IA no pudo generar un análisis.");
    }
    return output;
  }
);
