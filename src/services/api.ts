import type { Character } from "@/types/character";

// En desarrollo llamamos al backend directo (evita error de proxy). En producción usar ruta relativa.
const API_BASE_URL =
  import.meta.env.DEV ? "http://localhost:3001/api/characters" : "/api/characters";

/**
 * Obtiene un personaje de Star Wars por su ID
 * usando el servidor intermediario local.
 */
export async function fetchCharacter(id: number): Promise<Character> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/${id}`);
  } catch (err) {
    throw new Error(
      "No se pudo conectar con el servidor. Asegúrate de ejecutar 'npm run dev' (no solo 'vite')."
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.error || `Error ${response.status}: Personaje no encontrado`;
    throw new Error(message);
  }

  return response.json();
}
