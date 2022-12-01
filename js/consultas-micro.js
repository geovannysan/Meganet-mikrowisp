
const consulta = async (identificado) => {
  //0908851249
  try {
    const { data } = await axios.post("https://portal.comnet.ec/api/v1/GetClientsDetails",
      {
        "token": "NXJzUzNRNGljN0JOOWRpK252QXFzdz09",
        "cedula": "" + identificado

      })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error

  }
}
document.getElementById('btn_enviar_cont').addEventListener('click', function (e) {
  e.preventDefault()

  let identificado = document.getElementById("numeroid").value
  let lista = document.querySelector("div.estado")
  if (identificado.length != 10) {
    jSuites.notification({
      error: 1,
      name: 'Ingrese una cédula ',
      message: 'Formato de 10 dígitos ',
    })

    return
  }
  else
    this.setAttribute("disabled", true)
  e.path[0].children[0].classList.toggle("d-none")
  consulta(identificado).then(ouput => {
    if (ouput.estado == 'exito') {
      this.removeAttribute("disabled");
      let infomacion = ouput.datos[0];
      jSuites.notification({
        success: 1,
        name: 'busqueda exitosa',
        message: "Usuario encontrado: " + infomacion.nombre,
      })
      // console.log(infomacion)
      lista.classList.remove("" + !infomacion.estado == "ACTIVO" ? "bg-success" : "bg-danger")
      lista.classList.add("" + !infomacion.estado == "ACTIVO" ? "bg-danger" : "bg-success")
      document.getElementById("nombre").innerHTML = infomacion.nombre;
      document.getElementById("estado").innerHTML = infomacion.estado;
      document.getElementById("cantidad").innerHTML = infomacion.facturacion["facturas_nopagadas"];
      document.getElementById("valors").innerHTML = "$" + infomacion.facturacion["total_facturas"];
      this.removeAttribute("disabled");
      e.path[0].children[0].classList.toggle("d-none")
    }
    else {
      this.removeAttribute("disabled");
      jSuites.notification({
        error: 1,
        name: 'Usuario no encontrado',
        message: 'No hubo coincidencia',
      })
      this.removeAttribute("disabled");
      e.path[0].children[0].classList.toggle("d-none")
      document.getElementById("nombre").innerHTML = ".....";
      document.getElementById("estado").innerHTML = "DESCO";
      document.getElementById("cantidad").innerHTML = "0";
      document.getElementById("valors").innerHTML = "$ 00.00";

    }
  }).catch(err => {
    this.removeAttribute("disabled");
    e.path[0].children[0].classList.toggle("d-none")
    console.log(err)
  })
})
