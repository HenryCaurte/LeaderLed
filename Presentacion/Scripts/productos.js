const modalBack = document.getElementById('modalBack');
const modalItem = document.getElementById('modalItem');
const contenidoModal = document.getElementById('contenidoModal');
//parte de botones
const cerrarModalBtn = document.getElementById('cerrarModal');

function initInputs(){
    const checkboxes = document.querySelectorAll('.inputsTipo'); // las checkboxes
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
function abrirModal(imagen,precio,descripcion,distribuidores){
  //  contenidoModal.innerHTML = '';
    modalItem.style.display = 'flex';
    modalBack.style.display = 'block';
    llenarModal(imagen,precio,descripcion,distribuidores);
}
function cerrarModal(){
    modalItem.style.display = 'none';
    modalBack.style.display = 'none';
}
function iniciarBotones(){
    // el primero sera el del modal:
    cerrarModalBtn.addEventListener("click",()=>{
        cerrarModal();
    })
}
function imagenesSep(imagenes) {
    const descripcionDistribuidores = document.getElementById('descripcionDistribuidores');
    for (let a = 0; a < imagenes.length; a++) {
        const img = document.createElement('img');
        img.src = `Persistencia/Imagenes/SVG/${imagenes[a]}.png`;
        img.width = "100px";
        descripcionDistribuidores.appendChild(img);
    }
}
function llenarModal(imagen,precio,descripcion,distribuidores){
    var imagenes = distribuidores.split(',');
    

    contenidoModal.innerHTML =  `
    <div id="imagenPM"><img src="Persistencia/Imagenes/imgProductos/${imagen}.png" alt="" height="65%"></div> <!-- PM = Producto Modal-->
    <div id="descripcionPM">
        <div class="descripcionItem" id="descripcionPrecio">${precio}</div>
        <div class="descripcionItem" id="descripcionDistribuidores">
        <!--<img src="Persistencia/Imagenes/imgProductos/${distribuidores}" height="65%">-->
        </div>
        <div class="descripcionItem" id="descripcionPropiedades">${descripcion}</div>
    </div>
    `
    imagenesSep(imagenes);
}



iniciarBotones();