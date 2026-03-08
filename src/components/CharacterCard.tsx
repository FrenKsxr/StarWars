import type { Character } from "@/types/character";
import { User, Ruler, Weight, Eye, Palette, Calendar, Users, Film, Rocket, Car } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-accent" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="ml-auto text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function ListSection({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">
          {items.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-xl shadow-primary/10 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary to-accent px-6 py-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-sm">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary-foreground font-display">
                {character.name}
              </h2>
              <p className="text-sm text-primary-foreground/75 capitalize">
                {character.gender} &middot; {character.birth_year}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Atributos Fisicos
          </h3>
          <div className="divide-y divide-border">
            <InfoRow icon={Ruler} label="Altura" value={`${character.height} cm`} />
            <InfoRow icon={Weight} label="Masa" value={`${character.mass} kg`} />
            <InfoRow icon={Palette} label="Color de Cabello" value={character.hair_color} />
            <InfoRow icon={Palette} label="Color de Piel" value={character.skin_color} />
            <InfoRow icon={Eye} label="Color de Ojos" value={character.eye_color} />
            <InfoRow icon={Calendar} label="Nacimiento" value={character.birth_year} />
            <InfoRow icon={Users} label="Genero" value={character.gender} />
          </div>

          {/* Films */}
          <ListSection
            icon={Film}
            title="Peliculas"
            items={character.films}
          />

          {/* Vehicles */}
          <ListSection
            icon={Car}
            title="Vehiculos"
            items={character.vehicles}
          />

          {/* Starships */}
          <ListSection
            icon={Rocket}
            title="Naves Estelares"
            items={character.starships}
          />
        </div>
      </div>
    </div>
  );
}
