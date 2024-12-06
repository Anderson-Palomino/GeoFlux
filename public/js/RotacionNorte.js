class RotacionNorte extends ol.control.Control {
  constructor() {
    const boton = document.createElement("button");
    boton.innerHTML = "N";

    const contenedor = document.createElement("div");
    contenedor.className = "rotacion-norte ol-control";
    contenedor.appendChild(boton);

    super({
      element: contenedor,
    });

    boton.addEventListener("click", this.resetearNorte.bind(this));
  }
  resetearNorte() {
    // console.log("click en el boton");
    this.getMap().getView().setRotation(0);
  }
}

export default RotacionNorte;
