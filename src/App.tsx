import { useState, useCallback } from "react";
import SearchForm from "@/components/SearchForm";
import CharacterCard from "@/components/CharacterCard";
import SpaceBackground from "@/components/SpaceBackground";
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
    <div className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-4 py-8 overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-8">
        <header className="text-center flex flex-col items-center gap-4">
          <img
            src={logo}
            alt=""
            className="h-36 w-auto object-contain drop-shadow-[0_0_24px_rgba(56,189,248,0.3)]"
          />
          <p className="font-display text-lg sm:text-xl font-semibold tracking-wide text-foreground/95 text-balance">
            Busca tu personaje con Star Wars
          </p>
        </header>

        <SearchForm onSearch={handleSearch} isLoading={status === "loading"} />

        {/* Estado: cargando */}
        {status === "loading" && (
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-card/90 backdrop-blur-sm px-6 py-10 text-center shadow-xl shadow-primary/5"
            role="status"
            aria-live="polite"
          >
            <p className="text-muted-foreground font-body">Cargando personaje...</p>
          </div>
        )}

        {/* Estado: error */}
        {status === "error" && (
          <div
            className="w-full max-w-lg rounded-2xl border border-destructive/40 bg-destructive/10 backdrop-blur-sm px-6 py-6 shadow-xl"
            role="alert"
          >
            <p className="font-display font-semibold text-destructive">Error</p>
            <p className="mt-1 text-sm text-foreground/90">{errorMessage}</p>
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
