const pedidos = [];

const nombreProducto = document.querySelector("#nombreProducto");
const precioProducto = document.querySelector("#precioProducto");
const cantidadProducto = document.querySelector("#cantidadProducto");
const formulario = document.querySelector("#formPedido");
const tablaPedidos = document.querySelector("#tablaPedidos");
const totalUnidades = document.querySelector("#totalUnidades");
const montoTotal = document.querySelector("#montoTotal");
const precioMaximo = document.querySelector("#precioMaximo");
const btnFiltrar = document.querySelector("#btnFiltrar");
const btnMostrarTodos = document.querySelector("#btnMostrarTodos")
const btnLimpiar = document.querySelector("#btnLimpiar");

formulario.addEventListener("submit", registrarPedido)

function registrarPedido(e) {

    e.preventDefault()

    const nombre = validarNombre()

    if (!nombre) {
        alert("Nombre no valido")
        return;
    }

    const precio = validarPrecio()

    if (!precio) {
        alert("precio no valido")
        return;
    }

    const cantidad = validarCantidad()

    if (!cantidad) {
        alert("cantidad no valida")
        return;
    }

    pedidos.push({
        producto: nombreProducto.value.trim(),
        precio: parseFloat(precioProducto.value),
        cantidad: parseInt(cantidadProducto.value)
    })

    actualizarTabla();
    actualizarIndicadores()
}



const validarNombre = () => {
    const nombreValido = nombreProducto.value.trim().length > 0;
    return nombreValido;
}

const validarPrecio = () => {
    const precio = parseFloat(precioProducto.value);
    return Number.isFinite(precio) && precio > 0;
}

const validarCantidad = () => {
    const cantidad = Number(cantidadProducto.value);

    return Number.isInteger(cantidad) && cantidad > 0;
};

const actualizarTabla = () => {
    tablaPedidos.innerHTML = pedidos.map((pedido) => `
        <tr>
            <td>${pedido.producto}</td>
            <td>$${pedido.precio.toFixed(2)}</td>
            <td>${pedido.cantidad}</td>
            <td>$${(pedido.precio * pedido.cantidad).toFixed(2)}</td>
        </tr>
    `).join("");
};



const calcularTotalUnidades = () => {
    return pedidos.reduce((totalCantidad, pedido) => {
        return totalCantidad + pedido.cantidad;
    }, 0);
};

const calcularMontoTotal = () => {
    return pedidos.reduce((montoTotal, pedido) => {
        return montoTotal + (pedido.cantidad * pedido.precio);
    }, 0);
};


const actualizarIndicadores = () => {
    totalUnidades.textContent = calcularTotalUnidades();
    montoTotal.textContent = `$${calcularMontoTotal().toFixed(2)}`;
};


const precioMaximoTabla = (precioMaximo) => {
    const productosPrecioMaximo = pedidos.filter(
        (pedido) => pedido.precio <= precioMaximo
    );

    tablaPedidos.innerHTML = productosPrecioMaximo.map((pedido) => `
        <tr>
            <td>${pedido.producto}</td>
            <td>$${pedido.precio.toFixed(2)}</td>
            <td>${pedido.cantidad}</td>
            <td>$${(pedido.precio * pedido.cantidad).toFixed(2)}</td>
        </tr>
    `).join("");
};

btnFiltrar.addEventListener("click", () => {

    const precio = Number(precioMaximo.value);

    if (
        precioMaximo.value.trim() === "" ||
        !Number.isFinite(precio) ||
        precio <= 0
    ) {
        alert("Ingrese un precio máximo mayor que cero");
        return;
    }

    precioMaximoTabla(precio)
})

btnMostrarTodos.addEventListener("click", () => {
    actualizarTabla();
})

btnLimpiar.addEventListener("click", () => {

    pedidos.splice(0, pedidos.length);

    actualizarTabla();
    actualizarIndicadores();
})