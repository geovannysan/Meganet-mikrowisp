const consulta = async () => {
  try {
    const { data } = await axios.post("https://portal.comnet.ec/api/v1/GetClientsDetails",
      {
        "token": "NXJzUzNRNGljN0JOOWRpK252QXFzdz09",
        "cedula": "0908851249"

      })
    return data
  } catch (error) {
    return error
 
  }
}
function mensaje(){
$('body').toast({
  title: 'Better ?',
  message: 'Hey look, I have a title !'
})}



$("#btn_enviar_cont").click(function (e) {
  e.preventDefault()
  consulta().then(ouput => {
    mensaje()
  //  console.log(ouput)
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
