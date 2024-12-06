class PosicionActual extends ol.control.Control {
    constructor(geolocation) {
      const boton = document.createElement("button");
      boton.innerHTML = "O";
  
      const contenedor = document.createElement("div");
      contenedor.className = "posicion-actual ol-control";
      contenedor.appendChild(boton);
  
      super({
        element: contenedor,
      });

      this.geolocation = geolocation;
      boton.addEventListener("click", this.ubicar.bind(this));
    }
  
    ubicar() {
      this.geolocation.setTracking(true);
    }
  }
  
  export default PosicionActual;