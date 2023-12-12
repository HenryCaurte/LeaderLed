const imagenRelleno = document.getElementById('imagenRelleno');
const bombillo = document.getElementById('color_x5F_2');

imagenRelleno.addEventListener('click', ()=>{
    bombillo.style.fill = (bombillo.style.fill === "rgb(255, 255, 0)")? "#b9a765":"#FFFF00" ;
})
////

function iniciarMap(){
    var coord = {lat:4.606499623195332,lng: -74.07711585233254};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 16,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

/////

const inicio = document.getElementById("inicio");

$(document).ready(function(){
  $('#inicio').click(function(){
    console.log("clickeado")
    $('#main').load("Presentacion/Paginas/inicio.html")
  })
  $('#productos').click(function(){
    console.log("clickeado")
    $('#main').load("Presentacion/Paginas/productos.html")
  })

  $('#contacto').click(function(){
    console.log("clickeado")
    $('#main').load("Presentacion/Paginas/contacto.html")
  })
})