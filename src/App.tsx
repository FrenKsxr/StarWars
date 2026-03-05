import { useState, useCallback } from "react";
import SearchForm from "@/components/SearchForm";
import CharacterCard from "@/components/CharacterCard";
import { fetchCharacter } from "@/services/api";
import type { Character } from "@/types/character";
import logo from "@/assets/Logo.png";
import "./App.css";

type Status = "idle" | "loading" | "success" | "error";

function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSearch = useCallback(async (id: number) => {
    setStatus("loading");
    setErrorMessage("");
    setCharacter(null);
    try {
      const data = await fetchCharacter(id);
      setCharacter(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-8 bg-background">
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        <header className="text-center flex flex-col items-center gap-3">
          <img
            src={logo}
            alt="Star Wars"
            className="h-32 w-auto object-contain"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Busca un personaje por ID
          </p>
        </header>

        <SearchForm onSearch={handleSearch} isLoading={status === "loading"} />

        {/* Estado: cargando */}
        {status === "loading" && (
          <div
            className="w-full max-w-lg rounded-xl border border-border bg-card px-6 py-8 text-center state-loading"
            role="status"
            aria-live="polite"
          >
            <p className="text-muted-foreground">Cargando personaje...</p>
          </div>
        )}

        {/* Estado: error (ej. ID 999) */}
        {status === "error" && (
          <div
            className="w-full max-w-lg rounded-xl border border-destructive/50 bg-destructive/10 px-6 py-6 state-error"
            role="alert"
          >
            <p className="font-medium text-destructive">Error</p>
            <p className="mt-1 text-sm text-foreground">{errorMessage}</p>
          </div>
        )}

        {/* Estado: éxito — tarjeta solo cuando hay datos */}
        {status === "success" && character && (
          <CharacterCard character={character} />
        )}
      </div>
    </div>
  );
}

export default App;
