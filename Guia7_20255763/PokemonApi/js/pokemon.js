const RAPIDAPI_KEY = "dee5ad2432msh494d6a5d22e31b0p1fa352jsn8ef4c59e3074";
const RAPIDAPI_HOST =
    "pokedata-pokemon-moves-and-items-lookup.p.rapidapi.com";

const URL_LISTA =
    "https://pokedata-pokemon-moves-and-items-lookup.p.rapidapi.com/list?kind=pokemon&limit=20&offset=0";

const URL_DETALLE =
    "https://pokedata-pokemon-moves-and-items-lookup.p.rapidapi.com/pokemon?idOrName=";

const estado = document.getElementById("idEstado");
const listaPokemon = document.getElementById("idListaPokemon");
const detallePokemon = document.getElementById("idDetallePokemon");

const limpiarElemento = function (elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
};

const crearElemento = function (tipo, clase, texto) {
    const elemento = document.createElement(tipo);
    elemento.setAttribute("class", clase);
    elemento.textContent = texto;
    return elemento;
};

const consultarAPI = async function (url) {
    const respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
        },
    });

    if (!respuesta.ok) {
        throw new Error("La solicitud falló. Código: " + respuesta.status);
    }

    return await respuesta.json();
};

const cargarListaPokemon = async function () {
    estado.textContent = "Cargando la lista de Pokémon...";
    limpiarElemento(listaPokemon);

    try {
        const datos = await consultarAPI(URL_LISTA);

        if (!Array.isArray(datos.results)) {
            throw new Error("La respuesta no contiene la lista esperada.");
        }

        for (let index = 0; index < datos.results.length; index++) {
            const nombre = datos.results[index];
            const boton = crearElemento(
                "button",
                "list-group-item list-group-item-action",
                nombre
            );

            boton.setAttribute("type", "button");
            boton.addEventListener("click", function () {
                cargarDetallePokemon(nombre);
            });

            listaPokemon.appendChild(boton);
        }

        estado.textContent =
            "Se cargaron " +
            datos.results.length +
            " Pokémon. Selecciona uno para ver sus detalles.";
    } catch (error) {
        estado.textContent =
            "No se pudo cargar la lista de Pokémon. " + error.message;
    }
};

const agregarDato = function (contenedor, etiqueta, valor) {
    const fila = document.createElement("p");
    fila.setAttribute("class", "mb-2");

    const nombreDato = document.createElement("strong");
    nombreDato.textContent = etiqueta + ": ";

    const valorDato = document.createElement("span");
    valorDato.textContent = valor;

    fila.appendChild(nombreDato);
    fila.appendChild(valorDato);
    contenedor.appendChild(fila);
};

const cargarDetallePokemon = async function (nombre) {
    estado.textContent = "Cargando los detalles de " + nombre + "...";
    limpiarElemento(detallePokemon);

    const mensajeCarga = crearElemento(
        "p",
        "card-body mb-0",
        "Cargando información..."
    );
    detallePokemon.appendChild(mensajeCarga);

    try {
        const url = URL_DETALLE + encodeURIComponent(nombre);
        const datos = await consultarAPI(url);

        if (!datos.pokemon) {
            throw new Error("La respuesta no contiene los datos del Pokémon.");
        }

        const pokemon = datos.pokemon;
        limpiarElemento(detallePokemon);

        const cuerpo = crearElemento("div", "card-body", "");
        const titulo = crearElemento(
            "h3",
            "card-title text-capitalize",
            "#" + pokemon.id + " " + pokemon.name
        );
        cuerpo.appendChild(titulo);

        const imagenURL = pokemon.spriteArtwork || pokemon.spriteFront;

        if (imagenURL) {
            const imagen = document.createElement("img");
            imagen.setAttribute("src", imagenURL);
            imagen.setAttribute("alt", "Imagen de " + pokemon.name);
            imagen.setAttribute("class", "img-fluid d-block mx-auto mb-3");
            imagen.setAttribute("width", "220");
            cuerpo.appendChild(imagen);
        }

        agregarDato(cuerpo, "Tipos", pokemon.types.join(", "));

        let habilidades = "";

        for (let index = 0; index < pokemon.abilities.length; index++) {
            const habilidad = pokemon.abilities[index];

            if (index > 0) {
                habilidades += ", ";
            }

            habilidades += habilidad.name;

            if (habilidad.isHidden) {
                habilidades += " (oculta)";
            }
        }

        agregarDato(cuerpo, "Habilidades", habilidades);
        agregarDato(
            cuerpo,
            "Altura",
            pokemon.heightDecimetres * 10 + " cm"
        );
        agregarDato(
            cuerpo,
            "Peso",
            pokemon.weightHectograms / 10 + " kg"
        );
        agregarDato(cuerpo, "Experiencia base", pokemon.baseExperience);

        const subtituloEstadisticas = crearElemento(
            "h4",
            "h5 mt-4",
            "Estadísticas base"
        );
        cuerpo.appendChild(subtituloEstadisticas);

        const nombresEstadisticas = {
            hp: "HP",
            attack: "Ataque",
            defense: "Defensa",
            "special-attack": "Ataque especial",
            "special-defense": "Defensa especial",
            speed: "Velocidad",
        };

        for (const estadistica in pokemon.stats) {
            agregarDato(
                cuerpo,
                nombresEstadisticas[estadistica] || estadistica,
                pokemon.stats[estadistica]
            );
        }

        detallePokemon.appendChild(cuerpo);
        estado.textContent = "Detalles de " + pokemon.name + " cargados.";
    } catch (error) {
        limpiarElemento(detallePokemon);

        const mensajeError = crearElemento(
            "p",
            "card-body mb-0",
            "No se pudieron cargar los detalles. " + error.message
        );
        detallePokemon.appendChild(mensajeError);

        estado.textContent = "Ocurrió un error al consultar el Pokémon.";
    }
};

cargarListaPokemon();