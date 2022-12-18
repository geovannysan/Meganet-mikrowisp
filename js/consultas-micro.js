
const consultas = async (identificado) => {
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
  let identificado = document.getElementById("cedula").value
  console.log(identificado)
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
  console.log(e.path[0].children)
  //e.path[0].classList.toggle("d-none")
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
     // e.path[0].children[0].classList.toggle("d-none")
    }
    else {
      this.removeAttribute("disabled");
      jSuites.notification({
        error: 1,
        name: 'Usuario no encontrado',
        message: 'No hubo coincidencia',
      })
      this.removeAttribute("disabled");
      //e.path[0].children[0].classList.toggle("d-none")
      document.getElementById("nombre").innerHTML = ".....";
      document.getElementById("estado").innerHTML = "DESCO";
      document.getElementById("cantidad").innerHTML = "0";
      document.getElementById("valors").innerHTML = "$ 00.00";

    }
  }).catch(err => {
    this.removeAttribute("disabled");
   // e.path[0].children[0].classList.toggle("d-none")
    console.log(err)
  })
})
const consulta = async () => {
  try {
    
    const { data } = await axios.post("https://private-anon-c7547c2e18-mikrowisp.apiary-mock.com/api/v1/GetClientsDetails",
      {
        "token": "NXJzUzNRNGljN0JOOWRpK252QXFzdz09",
        "cedula": "0908851249"

      })
    return data
  } catch (error) {
    return error
  }
}

async function guardar(im){
const datos = await axios.post("http://127.0.0.1:5501/guardar.php")

}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


$("#btn_enviar_cont").click(function (e) {
  e.preventDefault()

  console.log("aqui")
  consulta().then(ouput => {

    console.log(ouput)
    let infomacion = ouput.datos[0];
    console.log(infomacion)

    document.getElementById("nombre").innerHTML = infomacion.nombre;
    document.getElementById("estado").innerHTML = infomacion.estado;
    document.getElementById("cantidad").innerHTML = infomacion.facturacion["facturas_nopagadas"];
    document.getElementById("valors").innerHTML = "$" + infomacion.facturacion["total_facturas"];

  }).catch(err => {
    console.log(err)
  })
})
/*
let imageUpload = document.getElementById("imageUpload");
let uploadMsg = document.getElementById("uploadMsg");
// display file name if file has been selected
imageUpload.onchange = function (e) {
  let input = this.files[0];
  let text;
  if (input) {
    //process input
    let img = new Image()
    img.src = window.URL.createObjectURL(this.files[0])
    var file = this.files[0];
    var fr = new FileReader();
    //fr.onload = createImage;   // onload fires after reading is complete
    fr.readAsDataURL(file);
    console.log(input)
    let fordata = new FormData();
    fordata.append('file', this.files[0]);
    fordata.append('api_key', "TEST");
    fordata.append('recognizer', "auto");
    fordata.append('ref_no', "ocr_nodejs_123");
    console.log(img)
    OCRAPI(fordata).then(ouput => {
      console.log(ouput)
    }).catch(err => {
      console.log(err)
    })
    /* getBase64(input).then(
       data => {
 
         
 
         console.log(data)
       }
     );*

    // text = imageUpload.value.replace("C: \\fakepath\\", "");
  } else {
    console.log(input)
    //s  text = "“Please select as file”";
  }
  //uploadMsg.innerHTML = text;
};
*/

