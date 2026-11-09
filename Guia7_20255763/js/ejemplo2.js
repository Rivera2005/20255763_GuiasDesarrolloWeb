// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Recorrer el formulario
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE = PASSWORD
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE = FILE
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }


    let resultado = `
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>
    `;

    bodyModal.textContent = resultado.replace(/<br>/g, "\n");
    //Funcion que permite mostrar el modal de Bootstrap
    //Esta funcion es definida por Bootstrap
    modal.show();
};

// Agregando funciones para validar el formulario y crear una tabla
const agregarFila = function (cuerpoTabla, campo, valor) {
    const fila = document.createElement("tr");

    const celdaCampo = document.createElement("th");
    celdaCampo.setAttribute("scope", "row");
    celdaCampo.textContent = campo;

    const celdaValor = document.createElement("td");
    celdaValor.textContent = valor;

    fila.appendChild(celdaCampo);
    fila.appendChild(celdaValor);
    cuerpoTabla.appendChild(fila);
};

const validarFormulario = function () {
    const nombres = document.getElementById("idNombre").value.trim();
    const apellidos = document.getElementById("idApellidos").value.trim();
    const fechaNacimiento = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value.trim();
    const password = document.getElementById("idPassword").value;
    const repetirPassword = document.getElementById("idPasswordRepetir").value;
    const pais = document.getElementById("idCmPais");
    const archivo = document.getElementById("idArchivo");

    let errores = "";

    // Validando que los campos no esten vacios
    if (
        nombres == "" ||
        apellidos == "" ||
        fechaNacimiento == "" ||
        correo == "" ||
        password == "" ||
        repetirPassword == ""
    ) {
        errores += "Complete todos los campos de texto.\n";
    }

    // Validando que la fecha de nacimiento no sea posterior a la fecha actual
    if (fechaNacimiento != "") {
        const fechaActual = new Date();
        let mes = fechaActual.getMonth() + 1;
        let dia = fechaActual.getDate();

        if (mes < 10) {
            mes = "0" + mes;
        }

        if (dia < 10) {
            dia = "0" + dia;
        }

        const fechaHoy =
            fechaActual.getFullYear() + "-" + mes + "-" + dia;

        if (fechaNacimiento > fechaHoy) {
            errores += "La fecha de nacimiento no puede ser posterior a hoy.\n";
        }
    }

    // Validando el formato del correo electronico
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo != "" && !expresionCorreo.test(correo)) {
        errores += "Ingrese un correo electronico valido.\n";
    }

    // Validando que las contrasenas sean iguales
    if (
        password != "" &&
        repetirPassword != "" &&
        password != repetirPassword
    ) {
        errores += "Las contrasenas no coinciden.\n";
    }

    // Verificando que se haya seleccionado al menos un interes
    const intereses = formulario.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    if (intereses.length == 0) {
        errores += "Seleccione al menos un interes.\n";
    }

    // Verificando que se haya seleccionado una carrera
    const carrera = formulario.querySelector(
        'input[name="idRdCarrera"]:checked'
    );

    if (carrera == null) {
        errores += "Seleccione una carrera.\n";
    }

    // Verificando que se haya seleccionado un pais
    if (pais.selectedIndex == 0) {
        errores += "Seleccione un pais de origen.\n";
    }

    // Verificando que se haya seleccionado una imagen
    if (archivo.files.length == 0) {
        errores += "Seleccione una imagen para su avatar.\n";
    }

    if (errores != "") {
        alert(errores);
        return;
    }

    // Creando la tabla con los datos del formulario
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped");

    const encabezado = document.createElement("thead");
    const filaEncabezado = document.createElement("tr");
    const tituloCampo = document.createElement("th");
    const tituloInformacion = document.createElement("th");

    tituloCampo.textContent = "Campo";
    tituloInformacion.textContent = "Informacion";

    filaEncabezado.appendChild(tituloCampo);
    filaEncabezado.appendChild(tituloInformacion);
    encabezado.appendChild(filaEncabezado);
    tabla.appendChild(encabezado);

    const cuerpoTabla = document.createElement("tbody");

    agregarFila(cuerpoTabla, "Nombres", nombres);
    agregarFila(cuerpoTabla, "Apellidos", apellidos);
    agregarFila(cuerpoTabla, "Fecha de nacimiento", fechaNacimiento);
    agregarFila(cuerpoTabla, "Correo electronico", correo);

    let textoIntereses = "";

    for (let index = 0; index < intereses.length; index++) {
        const etiquetaInteres = formulario.querySelector(
            'label[for="' + intereses[index].id + '"]'
        );

        if (index > 0) {
            textoIntereses += ", ";
        }

        textoIntereses += etiquetaInteres.textContent.trim();
    }

    agregarFila(cuerpoTabla, "Intereses", textoIntereses);

    const etiquetaCarrera = formulario.querySelector(
        'label[for="' + carrera.id + '"]'
    );

    agregarFila(
        cuerpoTabla,
        "Carrera",
        etiquetaCarrera.textContent.trim()
    );

    agregarFila(
        cuerpoTabla,
        "Pais de origen",
        pais.options[pais.selectedIndex].text
    );

    agregarFila(
        cuerpoTabla,
        "Imagen de avatar",
        archivo.files[0].name
    );

    tabla.appendChild(cuerpoTabla);

    // Limpiando el contenido anterior del modal
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    bodyModal.appendChild(tabla);
    modal.show();
};

// agregando eventos al boton
button.onclick = () => {
    validarFormulario();
};