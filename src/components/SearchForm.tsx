import { useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchFormProps {
  onSearch: (id: number) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [inputValue, setInputValue] = useState("");

  // Propiedad computada: validar que el input sea un número positivo
  const isValid = useMemo(() => {
    if (inputValue.trim() === "") return false;
    const num = Number(inputValue);
    return !isNaN(num) && num > 0 && Number.isInteger(num);
  }, [inputValue]);

  // Mensaje de error para feedback visual
  const errorMessage = useMemo(() => {
    if (inputValue.trim() === "") return "";
    if (isNaN(Number(inputValue))) return "Solo se permiten numeros";
    const num = Number(inputValue);
    if (num <= 0 || !Number.isInteger(num)) return "Ingresa un entero positivo";
    return "";
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onSearch(Number(inputValue));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              id="character-id"
              type="text"
              inputMode="numeric"
              placeholder="Ejemplo: 1, 2, 6..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Número de personaje"
              className={`h-12 w-full rounded-xl border bg-card/80 backdrop-blur-sm px-4 pr-11 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/50 ${
                errorMessage
                  ? "border-destructive/60 focus:ring-destructive/30"
                  : "border-border focus:border-primary/50"
              }`}
              aria-describedby={errorMessage ? "input-error" : undefined}
              aria-invalid={errorMessage ? "true" : "false"}
            />
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Buscando...</span>
              </>
            ) : (
              <span>Buscar</span>
            )}
          </button>
        </div>
        {errorMessage && (
          <p
            id="input-error"
            className="text-xs text-destructive animate-in fade-in duration-200"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        <p className="font-display text-xs tracking-wide text-muted-foreground/90">
          Busca un personaje de Star Wars
        </p>
      </div>
    </form>
  );
}
