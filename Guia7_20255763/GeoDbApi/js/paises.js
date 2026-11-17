const RAPIDAPI_KEY = "dee5ad2432msh494d6a5d22e31b0p1fa352jsn8ef4c59e3074";
const RAPIDAPI_HOST = "wft-geo-db.p.rapidapi.com";

const URL_LISTA =
    "https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10&offset=0";
const URL_DETALLE =
    "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/";

const estado = document.getElementById("idEstado");
const listaPaises = document.getElementById("idListaPokemon");
const detallePais = document.getElementById("idDetallePokemon");

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
    const textoRespuesta = await respuesta.text();

    if (!respuesta.ok) {
        throw new Error("Código " + respuesta.status + ": " + textoRespuesta);
    }

    return JSON.parse(textoRespuesta);
};

const cargarListaPaises = async function () {
    estado.textContent = "Cargando la lista de países...";
    limpiarElemento(listaPaises);

    try {
        const datos = await consultarAPI(URL_LISTA);

        if (!datos.data || !Array.isArray(datos.data)) {
            throw new Error("La respuesta no contiene la lista esperada.");
        }

        for (let index = 0; index < datos.data.length; index++) {
            const pais = datos.data[index];
            const boton = crearElemento(
                "button",
                "list-group-item list-group-item-action",
                pais.name + " (" + pais.code + ")"
            );
            boton.setAttribute("type", "button");
            boton.addEventListener("click", function () {
                cargarDetallePais(pais.code);
            });
            listaPaises.appendChild(boton);
        }

        estado.textContent = "Se cargaron " + datos.data.length +
            " países. Selecciona uno para ver sus detalles.";
    } catch (error) {
        estado.textContent = "No se pudo cargar la lista de países. " + error.message;
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

const cargarDetallePais = async function (codigo) {
    estado.textContent = "Cargando los detalles del país " + codigo + "...";
    limpiarElemento(detallePais);
    detallePais.appendChild(crearElemento(
        "p", "card-body mb-0", "Cargando información..."
    ));

    try {
        const datos = await consultarAPI(URL_DETALLE + encodeURIComponent(codigo));
        if (!datos.data) {
            throw new Error("La respuesta no contiene los datos del país.");
        }

        const pais = datos.data;
        limpiarElemento(detallePais);
        const cuerpo = crearElemento("div", "card-body", "");
        cuerpo.appendChild(crearElemento(
            "h3", "card-title", pais.name || "País"
        ));
        if (pais.flagImageUri) {
            const imagen = document.createElement("img");
            imagen.setAttribute("src", pais.flagImageUri);
            imagen.setAttribute("alt", "Bandera de " + pais.name);
            imagen.setAttribute("class", "img-fluid d-block mb-3 border");
            imagen.setAttribute("width", "180");
            cuerpo.appendChild(imagen);
        }
        if (pais.capital) agregarDato(cuerpo, "Capital", pais.capital);
        agregarDato(cuerpo, "Código ISO", pais.code || codigo);
        if (pais.callingCode) agregarDato(cuerpo, "Código de llamada", pais.callingCode);
        if (pais.currencyCodes) agregarDato(
            cuerpo, "Moneda", Array.isArray(pais.currencyCodes)
                ? pais.currencyCodes.join(", ") : pais.currencyCodes
        );
        if (pais.numRegions !== undefined) agregarDato(cuerpo, "Número de regiones", pais.numRegions);
        if (pais.wikiDataId) agregarDato(cuerpo, "WikiData ID", pais.wikiDataId);

        detallePais.appendChild(cuerpo);
        estado.textContent = "Detalles de " + pais.name + " cargados.";
    } catch (error) {
        limpiarElemento(detallePais);
        detallePais.appendChild(crearElemento(
            "p", "card-body mb-0", "No se pudieron cargar los detalles. " + error.message
        ));
        estado.textContent = "Ocurrió un error al consultar el país.";
    }
};

cargarListaPaises();
