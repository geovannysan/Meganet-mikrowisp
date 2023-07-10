const toastbody = document.getElementById("toast-body")
const toaast = document.querySelector('#toast-header')
const toasheader = document.getElementById("toastheader")
const spiner = document.getElementById("spiner")
function Toastainit(he,msg,rm,add) {
  console.log(he,msg,rm,add)
  toastbody.innerHTML =""+msg;
  toasheader.innerHTML=""+he
  toaast.classList.remove(""+rm)
  toaast.classList.add(""+add)
  new bootstrap.Toast(document.querySelector('#basicToast')).show();
}
const consulta = async (identificado) => {
  try {
    const { data } = await axios.post("https://rec.netbot.ec/mikroti/PortalApi/GetClientsDetails",
      {
        "cedula": identificado,
        "operador": "0999999999"
      })
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}
let idfactura = ""
let cantidad = ""
let idtransaccion = ""
let nota = ""
let bancodep = ""
let comprobantenu = ""
var valores = {
  comprobante: "",
  monto: ""
}
const consultaFact = async (id) => {
  try {
    const { data } = await axios.get("https://rec.netbot.ec/mikroti/PortalApi/GetInvoices/" + id + "/0999999999")
    // console.log(data)
    return data
  } catch (error) {
    return error
  }
}
const pagiCOm = async (id, parms) => {

  try {
    let { data } = await axios.post('https://rec.netbot.ec/mikroti/PortalApi/PagosdelPortal/' + id, parms)
    return data
  } catch (error) {
    return error
  }
}
document.getElementById('btn_enviar_cont').addEventListener('click', function (e) {
  e.preventDefault()
  let identificado = document.getElementById("numeroid").value
  let lista = document.querySelector("div.estado")
  if (identificado.length < 6) {
    Toastainit("Ingrese una cédula",'Formato de minimo 10 dígitos ',"bg-primary","bg-danger")
    /*jSuites.notification({
      error: 1, name: ' ',
      message: ,
    })*/
    document.getElementById("metodopago").classList.add("d-none")
    return
  }
  else {
    this.setAttribute("disabled", true)
    // e.path[0].children[0].classList.toggle("d-none")
    consulta(identificado).then(salida => {
      let ouput = salida

      console.log(ouput)

      if (ouput.estado == 'exito') {
        this.removeAttribute("disabled");
        //let infomacion = ouput.datos[0];

        let { facturacion, servicios, nombre, id, estado } = ouput.datos[0]
        if (servicios == null) {
          Toastainit("No registra servicio","Usuario encontrado:"+nombre,"bg-primary","bg-danger")        
          /*jSuites.notification({
            error: 2,
            name: 'No registra servicio',
            message: "Usuario encontrado: " + nombre,
          })*/
          return
        }
        Toastainit("Usuario encontrado:",nombre,"bg-danger","bg-primary")
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
        // e.path[0].children[0].classList.toggle("d-none")    
        document.getElementById("metodopago").classList.add("cliente-" + id)
        facturacion.facturas_nopagadas > 0 ? document.getElementById("metodopago").classList.remove("d-none") : document.getElementById("metodopago").classList.add("d-none")
        facturacion.facturas_nopagadas < 2 ? document.getElementById("ver").setAttribute("disable", true) : document.getElementById("ver").removeAttribute("disabled")
        if (parseInt(facturacion["facturas_nopagadas"]) > 0) {
          console.log(id)
          consultaFact(id).then(ouputs => {
            if (ouputs.estado == "exito") {
              idfactura = ouputs.facturas[ouputs.facturas.length - 1].id

              //  idfactura = ouputs.facturas[ouputs.facturas.length-1 ].id
              console.log(ouputs.facturas[ouputs.facturas.length - 1].id)
            }
            console.log(ouputs)
            var elem = document.getElementById("metodopago")
            elem.classList.remove("d-none");
          })
        }
      }
      else {
        this.removeAttribute("disabled");
        Toastainit("hubo un error",'Usuario no encontrado',"bg-primary","bg-danger")
  
      
        /* jSuites.notification({
           error: 1,
           name: 'Usuario no encontrado',
           message: 'No hubo coincidencia',
         })*/
        this.removeAttribute("disabled");
        // e.path[0].children[0].classList.toggle("d-none")
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
      // e.path[0].children[0].classList.toggle("d-none")
      console.log(err)
    })
  }
})

async function OCRAPI(parms) {
  let body = {
    "requests": [
      {
        "image": {
          "source": {
            "imageUri": parms //image URL
          }
        },
        "features": [
          {
            "type": "TEXT_DETECTION",
            "maxResults": 1
          }
        ]
      }
    ]
  }
  try {
    // const { data } = await axios.post("https://ocr.asprise.com/api/v1/receipt", parms)
    const { data } = await axios.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBlsbhniUup-e7m8BcoMTjBPZGRnphNjh4",
      body
    )
    return data
  } catch (error) {
    return error
  }
}
function getNumbersInString(string) {
  var tmp = string.split(" ");
  var map = tmp.map(function (current) {
    if (!isNaN(parseInt(current))) {
      return current;
    }
  });

  var numbers = map.filter(function (value) {
    return value != undefined;
  });
  if (parseFloat(numbers.join("")) > 1) return numbers.join("");
}
let imageUpload = document.getElementById("imageUpload");
imageUpload.onchange = function () {
  var input = this.files[0];
  console.log(this)
  if (input) {
    var fordata = new FormData();
    fordata.append('fileTest', this.files[0]);
    console.log(fordata)
    spiner.classList.remove("d-none")
    axios.post("https://microtikcd.000webhostapp.com/js/guardar.php", fordata).then(respuesta => respuesta)
      .then(decodificado => {
        if (!decodificado.data.status) {
          Toastainit("Hubo un error",""+decodificado.data.result,"bg-primary","bg-danger")
          spiner.classList.add("d-none")
         /* jSuites.notification({
            error: 1,
            name: 'Hubo un error',
            message: decodificado.data.result,
          })*/
          console.log(decodificado.data);
        }
        if (decodificado.data.status) {
         
          nota = decodificado.data.result
          OCRAPI(decodificado.data.result).then(salida => {
            console.log(salida)
            if (salida.responses[0].fullTextAnnotation == undefined) {
              Toastainit("Hubo un error","Su comprobante no sera procesado intente con otro o comunuiquese con otro mas","bg-primary","bg-danger")
              spiner.classList.add("d-none")
              console.log(salida)
              return
            }
            let respues = salida.responses[0].fullTextAnnotation.text.toLowerCase().split("\n")
            if (salida.responses[0].fullTextAnnotation.text.toLowerCase().includes("computecnicsnet")) {
              Toastainit("Hubo un error","Su comprobante no sera procesado intente con otro o comunuiquese con otro mas","bg-primary","bg-danger")
              spiner.classList.add("d-none")
              /*
              jSuites.notification({
                error: 1,
                name: 'Hubo un error',
                message: "Su comprobante no sera procesado intente con otro o comunuiquese con otro mas",
              })*/
              return
            }
            spiner.classList.add("d-none")
            console.log(respues, salida.responses[0].fullTextAnnotation.text.toLowerCase().includes("computecnicsnet"))
            if (respues.some(e => e.includes("banco pichincha"))) {
              if (respues.some(e => e.includes("transferencia"))) Pichincha("Transferencia", respues)
              if (respues.some(e => e.includes("deposito"))) Pichincha("Deposito", respues)
            }
            if (respues.some(e => e.includes("pacifico"))) {
              if (respues.some(f => f.includes("tu banco banco aqui"))) Pacifico("Deposito", respues)
              if (respues.some(f => f.includes("comprobante de transaccion"))) Pacifico("Deposito", respues)
            }
            if (respues.some(e => e.includes("banco guayaquil"))) {
              if (respues.some(e => e.includes("transferencia"))) Guayaquil("Transferencia", respues)
              if (respues.some(e => e.includes("deposito"))) Guayaquil("Deposito", respues)

            }
          }
          ).catch(erro =>{
            spiner.classList.add("d-none")
            console.log(erro)})
        }
        console.log(decodificado.data);
      }).catch(error => {
        spiner.classList.add("d-none")
        console.log(error)});

  } else {
    console.log(input)
    //s  text = "“Please select as file”";
  }
  //uploadMsg.innerHTML = text;
};

function Pichincha(tipo, arr) {
  let Total, Comprobante;

  switch (tipo) {
    case "Deposito":
      Total = arr.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        return String(e.match(/\d+(\.\d+)?/g))
      }).filter(f => f != undefined)
      Comprobante = arr.find(g => g.includes("documento:")).match(/\d+(\.\d+)?/g)
      console.log(Math.max(...Total).toFixed(2), String(Comprobante))
      document.getElementById("control").value = "" + Comprobante
      document.getElementById("monto").value = "$" + Math.max(...Total).toFixed(2)
      valores[0] = Comprobante
      cantidad = Math.max(...Total).toFixed(2)
      comprobantenu = String(Comprobante)
      bancodep = "CTA CTE BCO PICHINCHA 2100106995 COMPUTECNICS"
      return { Paga: Total, Comprobante: Comprobante }
    case "Transferencia":
      Total = arr.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        return String(e.match(/\d+(\.\d+)?/g))
      }).filter(f => f != undefined)
      Comprobante = arr.find(g => g.includes("comprobante:")).match(/\d+(\.\d+)?/g)
      console.log(Math.max(...Total).toFixed(2), String(Comprobante))
      document.getElementById("control").value = "" + Comprobante
      document.getElementById("monto").value = "$" + Math.max(...Total).toFixed(2)
      valores[0] = Comprobante
      cantidad = Math.max(...Total).toFixed(2)
      comprobantenu = String(Comprobante)
      bancodep = "CTA CTE BCO PICHINCHA 2100106995 COMPUTECNICS"
      return { Paga: Total, Comprobante: Comprobante }
  }
}
function Profubanco(tipo) {
  switch (tipo) {
    case "Deposito":
      return tipo
      break;
    case "Transferencia":
      return tipo
      break
  }
}
function Pacifico(tipo, arr) {
  let Total, Comprobante;
  switch (tipo) {
    case "Deposito":
      Total = arr.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        return String(e.match(/\d+(\.\d+)?/g))
      }).filter(f => f != undefined)
      Comprobante = arr.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        if (String(e.match(/\d+(\.\d+)?/g)).includes(",")) return
        return String(e.match(/\d+(\.\d+)?/g))

      }).filter(f => f != undefined)
      //  let Comprobante2 = arr.find(g => g.includes("No.")).match(/\d+(\.\d+)?/g)
      console.log(Math.max(...Total).toFixed(2), String(Comprobante))
      document.getElementById("control").value = "" + Comprobante
      document.getElementById("monto").value = "$" + Math.max(...Total).toFixed(2)
      valores[0] = Comprobante
      cantidad = Math.max(...Total).toFixed(2)
      comprobantenu = String(Comprobante)
      bancodep = "CTA CTE BCO GUAYAQUIL 2100106995 COMPUTECNICS"
      return { Paga: Total, Comprobante: Comprobante }
      break;
    case "Transferencia":
      Total = arr.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        return String(e.match(/\d+(\.\d+)?/g))
      }).filter(f => f != undefined)
      Comprobante = arr.find(g => g.includes("No.")).match(/\d+(\.\d+)?/g)

      console.log(Math.max(...Total).toFixed(2), String(Comprobante))
      document.getElementById("control").value = "" + Comprobante
      document.getElementById("monto").value = "$" + Math.max(...Total).toFixed(2)
      valores[0] = Comprobante
      cantidad = Math.max(...Total).toFixed(2)
      comprobantenu = String(Comprobante)
      bancodep = "CTA CTE BCO GUAYAQUIL 2100106995 COMPUTECNICS"
      return { Paga: Total, Comprobante: Comprobante }
      break
  }
}
function Guayaquil(tipo, arr) {
  let Total, Comprobante;

  switch (tipo) {
    case "Deposito":
      Total = arr.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        return String(e.match(/\d+(\.\d+)?/g))
      }).filter(f => f != undefined)
      Comprobante = arr.find(g => g.includes("control:")).match(/\d+(\.\d+)?/g)
      console.log(Math.max(...Total).toFixed(2), String(Comprobante))
      document.getElementById("control").value = "" + Comprobante
      document.getElementById("monto").value = "$" + Math.max(...Total).toFixed(2)
      valores[0] = Comprobante
      cantidad = Math.max(...Total).toFixed(2)
      comprobantenu = String(Comprobante)
      bancodep = "CTA CTE BCO GUAYAQUIL 2100106995 COMPUTECNICS"
      return { Paga: Total, Comprobante: Comprobante }
    case "Transferencia":
      Total = arr.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        return String(e.match(/\d+(\.\d+)?/g))
      }).filter(f => f != undefined)
      Comprobante = arr.find(g => g.includes("no.")).match(/\d+(\.\d+)?/g)
      console.log(Math.max(...Total).toFixed(2), String(Comprobante))
      document.getElementById("control").value = "" + Comprobante
      document.getElementById("monto").value = "$" + Math.max(...Total).toFixed(2)
      valores[0] = Comprobante
      cantidad = Math.max(...Total).toFixed(2)
      comprobantenu = String(Comprobante)
      bancodep = "CTA CTE BCO GUAYAQUIL 2100106995 COMPUTECNICS"
      return { Paga: Total, Comprobante: Comprobante }
  }
}






document.getElementById("buttonregiatro").addEventListener("click", function (e) {
  e.preventDefault()
  let info = {
    "idfactura": idfactura,
    "pasarela": bancodep,
    "cantidad": cantidad,
    "idtransaccion": idtransaccion,
    "nota": "ocrweb" + nota
  }
  let transacion = document.getElementById("control").value
  console.log(idtransaccion, info)
  if (idtransaccion != transacion) {
    jSuites.notification({
      error: 1,
      name: 'El comprobante es incorrecto',
      message: "Comuniquese con soporte",
    })
    return
  }
  if (transacion == idtransaccion) {
    pagiCOm("0941089492", info).then(function (respues) {
      console.log(respues, info)
      jSuites.notification({
        name: 'pago relizado',
        message: respues.mensaje,
      })
    }).catch(erro => {
      console.log()
    })
    return
  }
  jSuites.notification({
    error: 1,
    name: 'Hubo un error',
    message: "los datos ingresados son incorrectors",
  })
})
