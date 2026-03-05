# Star Wars — Consumidor de API (Examen)

Aplicación web que consume la **Star Wars API (SWAPI)**. Incluye un servidor intermediario (proxy), validación de formularios, peticiones asíncronas y una interfaz reactiva. Desarrollada como examen práctico.

---

## Inicio rápido (para el docente)

1. **Clonar** el repositorio: `git clone <url-del-repo>` y `cd starWars`
2. **Instalar dependencias:** `npm install` (descarga Express, React, Vite, Tailwind, etc.)
3. **Iniciar la aplicación:** `npm run dev` → abrir en el navegador la URL que indique Vite (ej. http://localhost:5173)

Sin `npm install` el proyecto no arranca correctamente porque faltarían las dependencias en `node_modules`.

---

## De qué trata el proyecto

El proyecto cumple con los requisitos de un examen que pide:

- **Backend:** Un servidor que actúe como proxy hacia la API externa para evitar CORS y centralizar las peticiones.
- **Frontend:** Una interfaz donde el usuario introduce el **ID de un personaje** (número). La app valida la entrada, llama al servidor y muestra los datos del personaje (atributos, películas, vehículos, naves) o un mensaje de error si no existe.
- **Validación:** No se permiten letras ni campos vacíos; el botón de búsqueda solo se habilita con un número entero positivo.
- **Control de errores:** Si se busca un ID inexistente (por ejemplo 999), se muestra un mensaje de error claro sin que la aplicación falle.
- **Reactividad y estilo:** El DOM se actualiza al recibir la respuesta (sin recargar la página) y se diferencian visualmente los estados de carga, éxito y error.

**API utilizada:** [https://swapi.py4e.com/api/](https://swapi.py4e.com/api/) (recursos: people, planets, films, species, vehicles, starships).

---

## Tecnologías utilizadas

| Ámbito     | Tecnología        | Uso |
|-----------|-------------------|-----|
| **Backend** | Node.js           | Entorno de ejecución |
|            | Express.js        | Servidor HTTP y rutas |
|            | Axios             | Peticiones a la API externa (SWAPI) |
|            | CORS              | Permitir peticiones desde el frontend |
| **Frontend** | React             | Interfaz de usuario |
|             | Vite              | Herramienta de desarrollo y empaquetado |
|             | TypeScript         | Tipado estático |
|             | Tailwind CSS       | Estilos (estados: carga, error, éxito) |
|             | Lucide React      | Iconos en la interfaz |
| **API externa** | SWAPI (swapi.py4e.com) | Datos de personajes de Star Wars |

---

## Requisitos previos

- **Node.js** instalado (recomendado v18 o superior).  
  Comprobar en la terminal: `node -v`
- **Git** (para clonar el repositorio).

---

## Clonar el proyecto e instalar dependencias

Si el proyecto está en un repositorio Git (GitHub, GitLab, etc.):

**Si ya tienes el proyecto en una carpeta** (descargado como ZIP o copiado), ábrela en la terminal y ve directo a **Instalar las dependencias**.

### 1. Clonar el repositorio

Abre una terminal en la carpeta donde quieras dejar el proyecto y ejecuta (sustituye la URL por la de tu repositorio):

```bash
git clone https://github.com/usuario/starWars.git
cd starWars
```

### 2. Instalar las dependencias del proyecto

Antes de ejecutar la aplicación hay que descargar todas las dependencias (Express, React, Vite, Tailwind, Axios, etc.). En la raíz del proyecto ejecuta:

```bash
npm install
```

Este comando lee el archivo `package.json`, descarga los paquetes indicados en `dependencies` y `devDependencies` y los guarda en la carpeta `node_modules`. Sin este paso la aplicación no iniciará correctamente.

---

## Cómo iniciar el proyecto

Una vez clonado y con las dependencias instaladas (`npm install` ya ejecutado):

### 1. Iniciar la aplicación (servidor + frontend)

Un solo comando arranca el **servidor backend** y el **frontend** en el orden correcto:

```bash
npm run dev
```

- Se inicia el servidor en **http://localhost:3001**.
- Cuando está listo, se abre el servidor de desarrollo de Vite (por ejemplo **http://localhost:5173**).
- Abrir en el navegador la URL que muestre Vite (normalmente `http://localhost:5173`).

**Importante:** Usar siempre `npm run dev` para desarrollar. No ejecutar solo `vite` ni solo el servidor por separado si se quiere probar la búsqueda desde el navegador.

### 2. Probar la aplicación

- Escribir un **ID** válido (por ejemplo **1**, **6**) y pulsar **Buscar** → debe mostrarse la ficha del personaje (con el logo del proyecto en la parte superior).
- Probar con un ID inexistente (por ejemplo **999**) → debe mostrarse un mensaje de error claro.
- Dejar el campo vacío o escribir letras → el botón **Buscar** debe permanecer deshabilitado.

---

## Scripts disponibles

| Comando        | Descripción |
|----------------|-------------|
| `npm run dev`  | Inicia servidor (puerto 3001) y luego Vite. **Usar este para trabajar.** |
| `npm run server` | Solo el servidor Express (proxy SWAPI). |
| `npm run build` | Compila el frontend para producción. |
| `npm run preview` | Sirve la build local para previsualización. |
| `npm run lint` | Ejecuta ESLint. |

---

## Estructura del proyecto (resumen)

```
starWars/
├── server/
│   └── index.js          # Servidor Express: proxy a SWAPI, ruta GET /api/characters/:id
├── scripts/
│   └── dev.mjs           # Script que inicia servidor y, al estar listo, Vite
├── src/
│   ├── App.tsx           # Contenedor: estado (personaje, carga, error) y búsqueda
│   ├── App.css           # Estilos globales y tema Tailwind
│   ├── main.tsx          # Punto de entrada React
│   ├── index.css         # Estilos base
│   ├── components/
│   │   ├── SearchForm.tsx    # Formulario con validación (solo número entero positivo)
│   │   └── CharacterCard.tsx # Tarjeta con datos del personaje
│   ├── services/
│   │   └── api.ts        # Función fetchCharacter(id) → llama al backend
│   ├── types/
│   │   └── character.ts  # Tipo TypeScript del personaje
│   └── assets/
│       └── Logo.jpg      # Logo del proyecto (cabecera de la web)
├── public/
│   ├── Logo.jpg         # Logo del proyecto (favicon y copia para la web)
│   └── vite.svg         # (sin uso; se usa Logo.jpg)
├── package.json
├── vite.config.ts
└── README.md
```

---

## Criterios del examen cubiertos

- **Validación:** El formulario no permite enviar letras ni campos vacíos (propiedad computada / validación que deshabilita el botón).
- **Control de errores:** ID inexistente (ej. 999) muestra mensaje de error amigable.
- **Reactividad:** El DOM se actualiza al recibir la respuesta, sin recargar la página.
- **Estilo:** Uso de CSS (Tailwind) para diferenciar estados de **carga**, **error** y **éxito**.
- **Servidor intermediario:** Express con ruta GET `:id`, try/catch y proxy a SWAPI.
- **Petición AJAX:** `fetch` desde el frontend al servidor local; estado de carga y manejo de respuestas/errores.

---

## Nota para el docente

La aplicación está implementada con **React + Vite + Tailwind CSS** en lugar de Vue.js, según indicación del estudiante de respetar el stack del proyecto. La lógica funcional (validación, proxy, manejo de errores, estados de carga y éxito) sigue los requisitos de la rúbrica del examen.
