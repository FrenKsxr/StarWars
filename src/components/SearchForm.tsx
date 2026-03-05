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
      <div className="flex flex-col gap-2">
        <label
          htmlFor="character-id"
          className="text-sm font-medium text-foreground"
        >
          ID del Personaje
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              id="character-id"
              type="text"
              inputMode="numeric"
              placeholder="Ej: 1, 2, 3..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`h-11 w-full rounded-lg border bg-card px-4 pr-10 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-2 ${
                errorMessage
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-border focus:ring-ring/30"
              }`}
              aria-describedby={errorMessage ? "input-error" : undefined}
              aria-invalid={errorMessage ? "true" : "false"}
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Ingresa un numero entero positivo para buscar un personaje de Star Wars
        </p>
      </div>
    </form>
  );
}
