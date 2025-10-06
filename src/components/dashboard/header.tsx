"use client";

import Link from "next/link";
import {
  LogOut,
  PlusCircle,
  User,
  Eye,
  EyeOff,
  Target,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MiGuitaLogo } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "../theme-toggle";

type DashboardHeaderProps = {
  onAddTransaction: () => void;
  onManageGoals: () => void;
  isBalanceVisible: boolean;
  onToggleBalanceVisibility: () => void;
};

export function DashboardHeader({ onAddTransaction, onManageGoals, isBalanceVisible, onToggleBalanceVisibility }: DashboardHeaderProps) {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 pt-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <MiGuitaLogo className="h-6 w-6" />
        <span className="">Mi Guita</span>
      </Link>
      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <Button size="sm" variant="outline" className="h-8 gap-1" onClick={onManageGoals}>
          <Target className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Gestionar Metas
          </span>
        </Button>
        <Button size="sm" className="h-8 gap-1" onClick={onAddTransaction}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Añadir Transacción
          </span>
        </Button>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={onToggleBalanceVisibility} className="h-8 w-8">
                        {isBalanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">
                            {isBalanceVisible ? "Ocultar saldos" : "Mostrar saldos"}
                        </span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isBalanceVisible ? "Ocultar saldos" : "Mostrar saldos"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <Avatar>
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" data-ai-hint={userAvatar.imageHint} width={40} height={40}/>}
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem>Soporte</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/" passHref>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
