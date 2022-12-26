const consulta = async (identificado) => {
  //0908851249 
  //TTZqNnlucVpuZmJUUXRzcDVSci9QQT09
  //  0956234413 0956234413
  //0918381419  
  //1204795080
  try {
    const { data } = await axios.post("js/consultacliente.php",
      {
        "cedula": identificado
      })
    // console.log(data)
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
      error: 1, name: 'Ingrese una cédula ',
      message: 'Formato de 10 dígitos ',
    })
    document.getElementById("metodopago").classList.add("d-none")
    return
  }
  else {
    this.setAttribute("disabled", true)
    e.path[0].children[0].classList.toggle("d-none")
    consulta(identificado).then(salida => {
      let ouput = JSON.parse(salida)

      console.log(ouput)

      if (ouput.estado == 'exito') {
        this.removeAttribute("disabled");
        //let infomacion = ouput.datos[0];
        let { facturacion, servicios, nombre, id, estado } = ouput.datos[0]
        jSuites.notification({
          success: 1,
          name: 'busqueda exitosa',
          message: "Usuario encontrado: " + nombre,
        })
        const { direcciion, perfil, ip, costo, emisor } = servicios[0]
        console.log(estado)
        lista.classList.remove("" + !estado == "ACTIVO" ? "bg-success" : "bg-danger")
        lista.classList.add("" + !estado == "ACTIVO" ? "" : "bg-success")
        lista.classList.add(estado == "SUSPENDIDO" ? "bg-danger" : 'bg-success')
        document.getElementById("nombre").innerHTML = nombre;
        document.getElementById("estado").innerHTML = estado;
        document.getElementById("cantidad").innerHTML = facturacion["facturas_nopagadas"];
        document.getElementById("valors").innerHTML = "$" + facturacion["total_facturas"];
        document.getElementById("perfil").innerHTML = "" + perfil
        this.removeAttribute("disabled");
        e.path[0].children[0].classList.toggle("d-none")
        document.getElementById("metodopago").classList.add("cliente-" + id)
        facturacion.facturas_nopagadas > 0 ? document.getElementById("metodopago").classList.remove("d-none") : document.getElementById("metodopago").classList.add("d-none")
        facturacion.facturas_nopagadas < 2 ? document.getElementById("ver").setAttribute("disable", true) : document.getElementById("ver").removeAttribute("disabled")

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
        lista.classList.remove("bg-success")
        lista.classList.add("bg-danger")
        document.getElementById("metodopago").classList.add("d-none")
      }
    }).catch(err => {
      this.removeAttribute("disabled");
      e.path[0].children[0].classList.toggle("d-none")
      console.log(err)
    })
  }
})
