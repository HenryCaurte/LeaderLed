const productosTotales = document.getElementById('productosTotales'); // guardo donde estan los productos totales para añadir uno nuevo cada vez que quiera
const listaCategorias = document.getElementById('listaProductos'); // par ala lista de categorias
const listaCat = []

const url = 'http://127.0.0.1:8000/productos/'; // url de django localhost
//const url = 'https://leaderled.000webhostapp.com/LogicaPhp/productos.php' //esta es para la web en general


function crearProducto(data,productosPagina) {
    var div = document.createElement('div')
    div.classList = "producto"
    div.id = "div" + data.id;
    div.innerHTML = `
        <div class="imagenProducto"><img src="Persistencia/Imagenes/imgProductos/${data.IdProducto}.png" alt="${data.IdProducto}" height="65%"></div> 
        <div class="descripcionProducto">
            <div class ="tipoProducto" id="tipoProducto${data.id}">${data.Tipo}</div>
            <div class="subtipoProducto" id="subtipoProducto${data.id}">${data.SubTipo}</div>
            <div class="valorProducto" id="valorProducto${data.id}">${data.Valor}</div>
        </div>
    `
    productosPagina.appendChild(div);

}

function actualizarProductos(data) {
    productosTotales.innerHTML = ''; //reiniciamos
    for (let a = 0; a < data.productos.length; a += 6) {
        if (a % 6 === 0 && a<data.productos.length) {
            var productosPagina = document.createElement('div');
            productosPagina.classList = "productosPagina";
            productosPagina.id = "pagina" + data.productos[a].id;
            productosTotales.appendChild(productosPagina); // metemos el div en cada uno
            for (let i = a; i < (a + 6); i++) {
                crearProducto(data.productos[i],productosPagina); // creamos el div
            }
        }
    }
}

productos = new Conexion(url);

function todosProductos(productos){
    productosTotales.innerHTML = ''; //reiniciamos
    productos.crearConexion((data) => {
        for (let a = 0; a < data.productos.length; a += 6) {
            if (a % 6 === 0 && a < data.productos.length) {
                var productosPagina = document.createElement('div');
                productosPagina.classList = "productosPagina";
                productosPagina.id = "pagina" + data.productos[a].id;
                productosTotales.appendChild(productosPagina); // metemos el div en cada uno
                console.log(data.productos[a].id)
                for (let i = a; i < (a + 6); i++) {
                    crearProducto(data.productos[i],productosPagina); // creamos el div
                }
            }
        }
    });
}

todosProductos(productos); // iniciamos todos los productos

// ahora el apartado de las categorias
categorias = new Conexion(url); // creamos unanueva conexion

function initInputs()
{
    const checkboxes = document.querySelectorAll('.inputsTipo');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                const dato = this.getAttribute('data-tipo');
                if(dato === "all"){
                    todosProductos(categorias); return;
                }
                categorias.buscar(dato, (data) => {
                    actualizarProductos(data);
                });
            }
        });
    });
}
async function inputsConexion() 
{
    await categorias.crearConexion((data) => {
        for (var a = 0; a < data.productos.length; a++) {
            if (listaCat.filter(e => e === data.productos[a].Tipo).length !== 0) {
                continue;
            }
            listaCat.push(data.productos[a].Tipo)
            var li = document.createElement('li');
            li.id = "li" + data.productos[a].id;
            li.innerHTML = `
            <input type="checkbox" class ="inputsTipo" id="item1${data.productos[a].id}" data-tipo="${data.productos[a].Tipo}"><label class="listas" for="item1${data.productos[a].id}">${data.productos[a].Tipo}</label>
            `
            listaCategorias.appendChild(li);
        }
    })

    initInputs(); // llamamos a la que queremos crear
}

inputsConexion();