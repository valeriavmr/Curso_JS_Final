/*
Logica para agregar los libros de la API
*/

/*async function crearListaLibros(){

  //Uso async y await para más claridad de código

  //Me traigo el contenedor donde iran los libros
  let contenedor_libros = document.getElementById("items")
  //Solo se ejecuta cuando exista el contenedor
  if(contenedor_libros!=null){
      try{
    //Me traigo los datos de la api
    const response = await fetch("https://fakestoreapi.com/products");
    const productos = await response.json();

    //Itero los libros para armarlos
    productos.forEach( producto=>{
      
      //creo los elementos que compondrán las tarjetas
      let article = document.createElement("article")
      let h3 = document.createElement("h3")
      let imagen = document.createElement("img")
      let p_autor = document.createElement("p")
      let autor = document.createElement("strong")
      let p_precio = document.createElement("p")
      let precio = document.createElement("strong")

      //Le pongo clases a los elementos por recuperar
      imagen.className = "imagenes"
      precio.className = "precio"

      //seteo los datos
      h3.textContent = producto.title;
      imagen.src = producto.image;
      imagen.alt = producto.title;
      autor.textContent = producto.category;
      p_autor.textContent = `Categoría: `;
      precio.textContent = producto.price;
      p_precio.textContent = `Precio: $`

      //armo la tarjeta
      article.appendChild(h3)
      article.appendChild(imagen)
      p_autor.appendChild(autor)
      p_precio.appendChild(precio)
      article.appendChild(p_autor)
      article.appendChild(p_precio)

      //adjunto la tarjeta a la lista
      contenedor_libros.appendChild(article)
    })

  }catch (error) {
    //Por si hay errores
    console.error("Error al cargar productos:", error);
  }
  //agrego los botones
  agregarBotonAgregar()
  }
}*/

async function crearListaLibros(){
  
  //Uso async y await para más claridad de código

  //Me traigo el contenedor donde iran los libros
  let contenedor_libros = document.getElementById("items")
  //Solo se ejecuta cuando exista el contenedor
  if(contenedor_libros!=null){
      try{
    //Me traigo los datos de la api
    const response = await fetch('https://dummyjson.com/products/');
    const data = await response.json();
    const productos = data.products

    //Itero los libros para armarlos
    productos.forEach( producto=>{

      console.log(producto)

      //creo los elementos que compondrán las tarjetas
      let article = document.createElement("article")
      let h3 = document.createElement("h3")
      let imagen = document.createElement("img")
      let p_disponible = document.createElement("p")
      let disponible = document.createElement("strong")
      let p_precio = document.createElement("p")
      let precio = document.createElement("strong")

      //Le pongo clases a los elementos por recuperar
      imagen.className = "imagenes"
      precio.className = "precio"

      //seteo los datos
      h3.textContent = producto.title;
      imagen.src = producto.images[0];
      imagen.alt = producto.title;
      disponible.textContent = producto.availabilityStatus;
      p_disponible.textContent = `Disponibilidada: `;
      precio.textContent = `$${producto.price}`;
      p_precio.textContent = `Precio: `

      //armo la tarjeta
      article.appendChild(h3)
      article.appendChild(imagen)
      p_disponible.appendChild(disponible)
      p_precio.appendChild(precio)
      article.appendChild(p_disponible)
      article.appendChild(p_precio)

      //adjunto la tarjeta a la lista
      contenedor_libros.appendChild(article)
    })

  }catch (error) {
    //Por si hay errores
    console.error("Error al cargar productos:", error);
  }
  //agrego los botones
  agregarBotonAgregar()
  }
}


//para guardar la info
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//función para agregar botón de agregar al carrito

function agregarBotonAgregar(){

    let productos = document.querySelectorAll("main > .items > article")

    productos.forEach(producto =>{
        //Creo un div para el botón
        let container_btn = document.createElement("div")

        //Creo el boton
        let btn_add_compra = document.createElement("button")
        btn_add_compra.id = "btn_add_compra"
        btn_add_compra.textContent = "Agregar al carrito"

        //Creo la funcion para que se guarde la info del libro
        btn_add_compra.onclick = () =>{
            let titulo = producto.querySelector("h3").textContent

            //Me aseguro que no se repitan los libros
            const index = carrito.findIndex(item => item.titulo === titulo)

            if(index===-1){
                
            let precio = producto.querySelector(".precio").textContent.replace("$","")

            //Agrego la cantidad
            let cantidad = Number(1);
            
            //Guardo la info y paso al link del carrito
            carrito.push({"titulo":titulo,"precio":precio, "cantidad":cantidad})
            localStorage.setItem("carrito", JSON.stringify(carrito));
            
            }

            window.location.href = "./carrito_2.html"
        }

        container_btn.appendChild(btn_add_compra)
        producto.appendChild(container_btn)

    })
}

//Me aseguro de que se ejecute la funcion
document.addEventListener("DOMContentLoaded",crearListaLibros());


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

fetch('https://dummyjson.com/products/category-list')
.then(res => res.json())
.then(console.log);