const modalBack = document.getElementById('modalBack');
const modalItem = document.getElementById('modalItem');
const separador = document.getElementById('separador'); //la parte donde estan las marcas
const contenidoModal = document.getElementById('contenidoModal');
const cerrarModalBtn = document.getElementById('cerrarModal');//parte de botones
const marcas = ['bjb','leviton','lifud','lutron','megaman','philips','royAlpha','silvania','tecnolite'] // son las marcas que se manejan, entonces TOCA AÑADIR LAS MARCAS QUE PERTENEZCAN AQUI: 
async function divMarcas(){
    for(var a = 0; a < marcas.length ; a++){
        auxDiv = document.createElement('div');
        auxDiv.className = "btnMarcas";
        auxDiv.dataset.distribuidor = marcas[a];
        auxDiv.innerHTML =  `<img src="Persistencia/Imagenes/SVG/${marcas[a]}.svg">`
        separador.appendChild(auxDiv);
    }

    const marcasProductos = document.querySelectorAll('.btnMarcas');

marcasProductos.forEach((e) => {
    console.log(); // Acceder al valor de data-distribuidor
    e.addEventListener('click', () => {
        console.log("hola_ " + e.getAttribute('data-distribuidor'));
        productos.buscarPorDistribuidor(e.getAttribute('data-distribuidor'), (data) => {
           if(data.productos.length === 0) // aqui tenemos la longitud de los prodcutos dedata
           {
               noProductos();
               return;
           }
            actualizarProductos(data);
        });
    });
});
}
divMarcas();
function initInputs() {
    const checkboxes = document.querySelectorAll('.inputsTipo'); // toca ponerlos aqui porque si no no las coge xd :(
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                const dato = this.getAttribute('data-tipo');
                if (dato === "all") {
                    todosProductos(productos);
                    checkboxes.forEach((otherCheckbox) => {
                        if (otherCheckbox !== this) {
                            otherCheckbox.checked = false;
                        }
                    });
                    return;
                }
                // Desmarcar las demás checkboxes
                checkboxes.forEach((otherCheckbox) => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });

                productos.buscar(dato, (data) => {
                    actualizarProductos(data);
                });
            }
        });
    });

}
function abrirModal(imagen,imagenes,descripcion,distribuidores){
    modalItem.style.display = 'flex';
    modalBack.style.display = 'block';
    llenarModal(imagen,imagenes,descripcion,distribuidores);
}
function cerrarModal(){
    modalItem.style.display = 'none'; modalBack.style.display = 'none';
}
function iniciarBotones(){
    cerrarModalBtn.addEventListener("click",()=>{
        cerrarModal();
    })
}
function imagenModal(imagenes,lugarDiv){
    LU = document.getElementById(lugarDiv);
    for(let a = 0; a<imagenes.length;a++){
        const div = document.createElement('div');
        div.className= "divImagenPM";
        const img = document.createElement('img');
        img.src = `Persistencia/Imagenes/imgProductos/${imagenes[a]}.png`
        div.appendChild(img);
        LU.appendChild(div);
    }
}
function imagenesSep(imagenes,lugarDiv) {
    LU = document.getElementById(lugarDiv);
    for (let a = 0; a < imagenes.length; a++) {
        const img = document.createElement('img');
        img.src = `Persistencia/Imagenes/SVG/${imagenes[a]}.svg`
        img.loading = "lazy";
        LU.appendChild(img);
    }
}
function tablaDescripcion(descripcion){
    var partes = descripcion.split(',');
    var tabla = [];
    for(var a= 0; a< partes.length ; a++){
        let aux =  partes[a].split(':');
        tabla.push(aux);
    }
   for(var a = 0; a< tabla.length; a++){
       const col = document.createElement('td');
       const fil = document.createElement('td');
       col.innerHTML = `${tabla[a][0]}`
       fil.innerHTML = `${tabla[a][1]}`
       document.getElementById("cabeceraTabla").appendChild(col)
       document.getElementById("informacionTabla").appendChild(fil)
    }    
}
function llenarModal(imagen,imagenes,descripcion,distribuidores){
    var distrib = distribuidores.split(',');
    try{
    var images = imagenes.split(',')
    }
    catch{}
    contenidoModal.innerHTML =  `
    <div id="imagenPM">
        <div class= "divImagenPM">
            <img src="Persistencia/Imagenes/imgProductos/${imagen}.png" alt="" height="65%" loading="lazy">
        </div>
        <button id="izqMovilidad">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>
        <button id="derMovilidad" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        </button>
    </div> <!-- PM = Producto Modal-->
    <div id="descripcionPM">
        <div class="descripcionItem" id="descripcionPropiedades">
            <div id="contenedorTabla">
                <table>
                    <tr id="cabeceraTabla">
                    </tr>
                    <tr id="informacionTabla">
                    </tr>
                </table>
            </div>
        
        </div>
        <div class="descripcionItem" id="descripcionDistribuidores"></div>
    </div>
    `
    imagenesSep(distrib,"descripcionDistribuidores");
    imagenModal(images,"imagenPM"); 
    tablaDescripcion(descripcion)
    izqMovilidad.onclick = () =>{
           document.getElementById('imagenPM').scrollLeft -= 1250;
    }
     derMovilidad.onclick = () =>{
           document.getElementById('imagenPM').scrollLeft += 1250;
    }
}
// creare lo que son los botones para 
iniciarBotones();