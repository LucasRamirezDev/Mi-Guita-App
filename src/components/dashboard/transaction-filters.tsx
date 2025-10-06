"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, Category } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { type Filters } from "@/app/dashboard/page";

type TransactionFiltersProps = {
  onFiltersChange: (filters: Filters) => void;
};

export function TransactionFilters({
  onFiltersChange,
}: TransactionFiltersProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Filters["type"]>("all");
  const [category, setCategory] = useState<Filters["category"]>("all");
  
  useEffect(() => {
    // Debounce filter changes to avoid excessive re-renders
    const handler = setTimeout(() => {
      onFiltersChange({ query, type, category });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, type, category, onFiltersChange]);

  const handleTypeChange = (value: string) => {
    const newType = value as Filters["type"];
    setType(newType);
    if (newType === 'income') {
      setCategory('Ingresos');
    } else if (newType === 'expense' && category === 'Ingresos') {
      setCategory('all');
    } else if (newType === 'all' && category === 'Ingresos') {
      setCategory('all');
    }
  }

  const filteredCategories = React.useMemo(() => {
    if (type === 'income') return categories.filter(c => c === 'Ingresos');
    if (type === 'expense') return categories.filter(c => c !== 'Ingresos');
    return categories;
  }, [type]);

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por descripción..."
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="income">Ingreso</SelectItem>
            <SelectItem value="expense">Gasto</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={(value) => setCategory(value as Filters['category'])}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {filteredCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
