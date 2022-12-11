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
async function OCRAPI(parms) {
  try {
    const { data } = await axios.post("https://ocr.asprise.com/api/v1/receipt", parms)
    return data
  } catch (error) {
    return error
  }
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

let imageUpload = document.getElementById("imageUpload");
let uploadMsg = document.getElementById("uploadMsg");
// display file name if file has been selected
imageUpload.onchange = function (e) {
  let input = this.files[0];
  let text;
  if (input) {
    //process input
    console.log(input)
    let fordata = new FormData();
    fordata.append('file', this.files[0]);
    fordata.append('api_key', "TEST");
    fordata.append('recognizer', "auto");
    fordata.append('ref_no', "ocr_nodejs_123");
    OCRAPI(fordata).then(ouput => {
      console.log(ouput)
    }).catch(err => {
      console.log(err)
    })
    // text = imageUpload.value.replace("C: \\fakepath\\", "");
  } else {
    console.log(input)
    //s  text = "“Please select as file”";
  }
  //uploadMsg.innerHTML = text;
};


