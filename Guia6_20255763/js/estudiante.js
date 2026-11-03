const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombre = document.getElementById("idTxtNombre");
const inputDui = document.getElementById("idTxtDui");
const inputNit = document.getElementById("idTxtNit");
const inputFecha = document.getElementById("idTxtFechaNacimiento");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputEdad = document.getElementById("idTxtEdad");

const btnValidar = document.getElementById("idBtnValidar");
const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const regexCarnet = /^[A-Za-z]{2}\d{3}$/;
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexDui = /^\d{8}-\d{1}$/;
const regexNit = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const regexFecha = /^(0[1-9]|[12]\d|3[01])[\/\-](0[1-9]|1[0-2])[\/\-]\d{4}$/;
const regexCorreo = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/;
const regexEdad = /^\d+$/;

btnValidar.onclick = () => {
    let errores = [];

    if (!regexCarnet.test(inputCarnet.value)) {
        errores.push("Carnet inválido.");
    }
    if (!regexNombre.test(inputNombre.value) || inputNombre.value.trim() === "") {
        errores.push("Nombre inválido.");
    }
    if (!regexDui.test(inputDui.value)) {
        errores.push("DUI inválido.");
    }
    if (!regexNit.test(inputNit.value)) {
        errores.push("NIT inválido.");
    }
    if (!regexFecha.test(inputFecha.value)) {
        errores.push("Fecha inválida.");
    }
    if (!regexCorreo.test(inputCorreo.value)) {
        errores.push("Correo inválido.");
    }
    if (!regexEdad.test(inputEdad.value)) {
        errores.push("Edad inválida.");
    }

    if (errores.length > 0) {
        mensaje.innerHTML = errores.join("<br>");
        notificacion.classList.replace("text-bg-success", "text-bg-danger");
        toast.show();
    } else {
        mensaje.innerHTML = "Toda la información es válida.";
        notificacion.classList.replace("text-bg-danger", "text-bg-success");
        toast.show();
    }
};