// Generamos un número aleatorio que se encuentra en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Creamos una constante que permite identificar el maximo de intentos
const numeroIntentos = 3;
// Guardara el número de intentos que realiza el usuario
let intentos = 1;

function generarNumeroAleatorio() {
    //Definimos una variable para imprension de mensajes
    let mensaje;
    // Utilizamos el dom para acceder al parrafo creado
    const parrafo = document.querySelector("#idParrafo");

    // Verificamos en que intento esta el usuario
    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );

        //verificamos el numero aleatorio con el ingresado por el usuario
        if (numero == numeroAleatorio) {
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio}).
        Refresque la página para volver a jugar.`
        }
        // EJERCICIO 1: Para darle pistas al usuario del número
        // damos la pista si es más bajo que el secreto
        else if (numero < numeroAleatorio) {
            mensaje = `El número que buscas es más alto. Quedan ${numeroIntentos - intentos} intentos`;
        }
        // damos la pista si es más alto que el secreto
        else if (numero > numeroAleatorio) {
            mensaje = `El número que buscas es más bajo. Quedan ${numeroIntentos - intentos} intentos`;
        }

        /* 
        Elimino este bloque porque no se podra ver bien la pista, asi que se lo agregamos a cada pista
         else {
             mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - intentos
                 } intentos`;
         }
         */
        //aumentamos el valor de los intentos
        intentos++;

    } else {
        mensaje = `Su numero de intentos ha terminado.
    El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}
