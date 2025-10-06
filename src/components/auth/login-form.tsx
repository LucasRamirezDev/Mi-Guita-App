
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="usuario@example.com"
          defaultValue="usuario@example.com"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Contraseña</Label>
          <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Input id="password" type="password" defaultValue="password" />
      </div>
      <Link href="/dashboard" passHref>
        <Button className="w-full">
          Iniciar sesión
        </Button>
      </Link>
      <div className="mt-4 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="#" className="underline" prefetch={false}>
          Regístrate
        </Link>
      </div>
    </div>
  );
}
