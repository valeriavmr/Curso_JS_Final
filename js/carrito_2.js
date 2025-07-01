//Muestro al producto, su precio y opcion para borrar o agregar

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Las opciones del carrito
function mostrarOpcionesCarrito(){

    let total_compra = Number(0)

    //Muestro el total de la compra
    let total_div = document.createElement("p")
    total_div.id = "total_compra"

    let subtotal = document.querySelector(".subtotal")
    let tabla_productos = document.querySelector("tbody")

    //creo el apartado del producto
    carrito.forEach(element => {
        let producto_div = document.createElement("tr");

        producto_div.className ="producto_carrito"

        //El producto
        let nombre_libro = document.createElement("td")
        nombre_libro.textContent = element.titulo;

        //La cantidad a escoger
        let celda_cantidad = document.createElement("td")
        let cantidad_input = document.createElement("input")
        cantidad_input.type = "number"
        cantidad_input.min = 1;
        cantidad_input.value = Number(element.cantidad);
        cantidad_input.style.width = "40px";
        

        //El precio
        let precio = document.createElement("td")
        precio.textContent = `$${element.precio}`

        //Total producto
        let total_producto = document.createElement("td")
        total_producto.textContent = `$${Number(cantidad_input.value)*Number(element.precio)}`

        //Agrego al total
        let total_producto_str = total_producto.textContent.replace("$","")
        let total_producto_num = Number(total_producto_str)
        total_compra+= total_producto_num

        //me aseguro que el total cambie segun la cantidad
        cantidad_input.onchange = () =>{
            total_producto.textContent = `$${Number(cantidad_input.value)*Number(element.precio)}`
            total_compra-= total_producto_num


            //Actualizo la cantidad
            element.cantidad = Number(cantidad_input.value);

            //Me aseguro que la nueva cantidad se guarde en el carrito
            let element_modificado = element;
            const nuevoCarrito = carrito.filter(item => item.titulo !== element.titulo);

            nuevoCarrito.push(element_modificado)

            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

            actualizarContadorCarrito()

            total_producto_str = total_producto.textContent.replace("$","")
            total_producto_num = Number(total_producto_str)
            total_compra += total_producto_num
            total_div.textContent = `TOTAL COMPRA: $${total_compra}`
        }

        //Boton para borrar el producto del carrito
        let celda_accion = document.createElement("td")
        let del_producto = document.createElement("a")

        let del_producto_img = document.createElement("img")
        del_producto_img.id = "del_producto_img"
        del_producto_img.src = "../res/delete_24dp.png"

        //Resto el total del producto a la compra y luego borro el elemento
        del_producto.onclick = () =>{
            total_compra -= Number(element.precio)*Number(cantidad_input.value)
            total_div.textContent = `TOTAL COMPRA: $${total_compra}`
            const carritoActualizado = JSON.parse(localStorage.getItem("carrito")) || [];

            const nuevoCarrito = carritoActualizado.filter(item => item.titulo !== element.titulo);

            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
            producto_div.remove();
            actualizarContadorCarrito();
        }

        //Uno todo
        del_producto.appendChild(del_producto_img)
        celda_accion.appendChild(del_producto)
        celda_cantidad.appendChild(cantidad_input)
        producto_div.appendChild(nombre_libro)
        producto_div.appendChild(celda_cantidad)
        producto_div.appendChild(precio)
        producto_div.appendChild(total_producto)
        producto_div.appendChild(celda_accion)
        tabla_productos.appendChild(producto_div)
    });
    //Muestro el total de la compra
    total_div.textContent = `TOTAL COMPRA: $${total_compra}`

    subtotal.appendChild(total_div)
}

//Me aseguro de que se ejecute la funcion
document.addEventListener("DOMContentLoaded",mostrarOpcionesCarrito())

//Logica de los botones
//Para cancelar la compra
let btn_cancel = document.getElementById("btn_cancel_compra")
btn_cancel.onclick = () =>{
    localStorage.clear();
    window.location.href="../index.html"
}

//Para seguir comprando
let btn_seguir_compra = document.getElementById("btn_seguir_compra")

btn_seguir_compra.onclick = () => {
    window.location.href="./carrito.html"
}

//Mostrar el icono de carrito

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");

  const carritoActualizado = JSON.parse(localStorage.getItem("carrito")) || [];

  let totalCantidad = Number(0)

  carritoActualizado.forEach(libro => {
    totalCantidad+=libro.cantidad
  })

  if (totalCantidad > 0) {
    contador.textContent = totalCantidad;
    contador.style.display = "inline-block";
  } else {
    contador.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito());


//Mensaje al finalizar la compra
document.getElementById("btn_fin_compra").onclick = () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let total = 0;

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  carrito.forEach(item => {
    const cantidad = Number(item.cantidad) || 1;
    total += Number(item.precio) * cantidad;
  });

  const mensaje = `El total de tu compra es $${total}.\n ¡Gracias por su compra!`;

  alert(mensaje);

  //Limpio el storage
  localStorage.clear()

  //Me voy al inicio
  window.location.href="../index.html"
};