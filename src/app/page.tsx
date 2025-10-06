import { LoginForm } from "@/components/auth/login-form";
import { BudgetFlowLogo } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <BudgetFlowLogo className="mb-4 h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-bold">Bienvenido a BudgetFlow</CardTitle>
          <CardDescription>
            Inicia sesión para administrar tus finanzas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
