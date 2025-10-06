import { LoginForm } from "@/components/auth/login-form";
import { MiGuitaLogo } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <MiGuitaLogo className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Bienvenido a Mi Guita
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Inicia sesión para administrar tus finanzas.
          </p>
        </div>
        <Card className="w-full">
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
