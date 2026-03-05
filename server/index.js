import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;
const SWAPI_BASE = "https://swapi.py4e.com/api";

app.use(cors());
app.use(express.json());

/**
 * Resuelve una URL de SWAPI y devuelve el título o nombre del recurso.
 */
async function fetchResourceName(url) {
  const res = await axios.get(url, { timeout: 5000 });
  return res.data.title ?? res.data.name ?? url;
}

/**
 * GET /api/characters/:id
 * Proxy que obtiene un personaje de SWAPI y resuelve films, vehicles, starships a nombres.
 */
app.get("/api/characters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const url = `${SWAPI_BASE}/people/${id}/`;
    const response = await axios.get(url, { timeout: 10000 });

    const data = response.data;

    const [films, species, vehicles, starships] = await Promise.all([
      Promise.all((data.films || []).map(fetchResourceName)),
      Promise.all((data.species || []).map(fetchResourceName)),
      Promise.all((data.vehicles || []).map(fetchResourceName)),
      Promise.all((data.starships || []).map(fetchResourceName)),
    ]);

    const character = {
      name: data.name,
      height: data.height,
      mass: data.mass,
      hair_color: data.hair_color,
      skin_color: data.skin_color,
      eye_color: data.eye_color,
      birth_year: data.birth_year,
      gender: data.gender,
      homeworld: data.homeworld,
      films,
      species,
      vehicles,
      starships,
    };

    res.json(character);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({
        error: "Personaje no encontrado. Prueba con otro ID (por ejemplo, 1 a 83).",
      });
    }
    if (err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT") {
      return res.status(503).json({
        error: "No se pudo conectar con la API. Intenta más tarde.",
      });
    }
    res.status(500).json({
      error: err.response?.data?.detail || "Error al obtener el personaje.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy SWAPI en http://localhost:${PORT}`);
});
