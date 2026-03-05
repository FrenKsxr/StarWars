// ============================================================
// Servidor Intermediario (Proxy) - Star Wars API
// ============================================================
// Este servidor actua como proxy para evitar problemas de CORS
// y centralizar las peticiones hacia la Star Wars API (SWAPI).
//
// Para ejecutar:
//   npm init -y
//   npm install express cors axios
//   node server.js
// ============================================================

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3001;

// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

// Ruta GET que recibe un parametro :id para buscar un personaje
app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validacion en servidor: el ID debe ser un numero positivo
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
      return res
        .status(400)
        .json({ error: "El ID debe ser un numero entero positivo" });
    }

    // Peticion a la Star Wars API usando axios
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    res.json(response.data);
  } catch (error) {
    // Bloque catch para manejar errores cuando el personaje no exista
    if (error.response && error.response.status === 404) {
      res
        .status(404)
        .json({ error: `Personaje con ID ${req.params.id} no encontrado` });
    } else {
      console.error("Error del servidor:", error.message);
      res
        .status(500)
        .json({
          error: "Error interno del servidor. Intenta de nuevo mas tarde.",
        });
    }
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor intermediario corriendo en http://localhost:${PORT}`);
  console.log(`Ejemplo: http://localhost:${PORT}/api/characters/1`);
});
