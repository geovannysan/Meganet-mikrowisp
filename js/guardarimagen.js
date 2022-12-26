function cargardatos() {
    let respues = JSON.parse(localStorage.getItem("consilta"))
    let nuevo = respues
    let numeros = respues.map(e => {
        if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
        if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
        return String(e.match(/\d+(\.\d+)?/g))
    }).filter(f => f != undefined)
    //console.log(respues.find(g => g.includes("Comprobante")), 
    // respues.some(e =>  e.includes("PICHINCHA")))
    // console.log(nuevo.some(e => e.includes("Transferencia")))
    // console.log(numeros)
    //console.log(Math.max(...numeros).toFixed(2));
    let guaya = ['Banco', 'Buayaquil', '$20.00', 'Transferencia interna otras ctas', 'No.0001485349', '15/12/2022 07:48:53', 'Vera Gonzalez Marisol Azucena', 'Ahorros - 003XXX1111', 'Computecnicsnet S A', 'Banco Guayaquil Corriente - 1XXX8624', 'Comisión', 'Transferencia interna otras ctas', 'Valor debitado', '$0.00', '$20.00']
    let pacifc = ['Banco Del Pacifico', 'Comprobante De Transacción', 'Tipo De Transacción', 'Fecha:', 'Transacción:', 'Secuencial Tbba:', 'Nombre De Comercio:', 'Código De Comercio:', 'Ciudad:', 'Usuario:', 'Identificación Depositante:', 'Nombre:', 'Cuenta:', 'Tipo Moneda:', 'Valor:', 'Forma De Pago:', 'Depósitos Tu Banco Banco Aqui', '12/12/2022 11:22:12', '150421', '026741', 'Despensa Y Bazar Daniela', '0901002231', 'Guayaquil', 'Tpcak00001', '0923229652', 'Computecnisnet S.A. - Comnet', '80xxx30', 'Usd', '12.54', 'Efectivo', 'Este Comprobante De Transacción No Es Negociable, Ni', 'Transferible, Ni Puede Ser Objeto De Ningún Tipo De', 'Comercialización O Negociación Por Parte De Su Tenedor.']
    console.log(pacifc)
    if (respues.some(e => e.includes("PICHINCHA"))) {
        if (nuevo.some(e => e.includes("Transferencia"))) Pichincha("Transferencia", nuevo)
    }
    if (pacifc.some(e => e.includes("Pacifico"))) {
        if (pacifc.some(f => f.includes("Tu Banco Banco Aqui"))) Pacifico("Deposito", pacifc)
    }
    if (guaya.some(e => e.includes("Guayaquil"))) {
        if (guaya.some(e => e.includes("Transferencia"))) Guayaquil("Transferencia", guaya)
    }

}
cargardatos()
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
    var tmp = string.split(" ") != undefined ? string.split(" ") : string;
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
    OCRAPI("https://meganet.covagu.com/files/20221223031226.jpeg").then(salida => {
        let respues = salida.responses[0].fullTextAnnotation.text.split("\n")
        let nuevo = respues.filter(function (value) {
            return value != undefined;
        })
        //localStorage.setItem("guayaquil",JSON.stringify(respues))
        //console.log(respues, nuevo)
    }
    ).catch(erro => console.log(erro))
    /*if (input) {
        var fordata = new FormData();
        fordata.append('fileTest', this.files[0]);
        console.log(fordata)
        var valores = {
            comprobante: "",
            monto: ""
        }
        axios.post("js/guardar.php", fordata).then(respuesta => respuesta)
            .then(decodificado => {
                if (!decodificado.data.status) {
                    jSuites.notification({
                        error: 1,
                        name: 'Hubo un error',
                        message: decodificado.data.result,
                    })
                    console.log(decodificado.data);
                }
                if (decodificado.data.status) {
                    OCRAPI(decodificado.data.result).then(salida => {
                        let respues = salida.responses[0].fullTextAnnotation.text.split("\n")
                        let nuevo = respues.map((e, i) => {
                            if (e.includes("Comprobante")) {
                                document.getElementById("control").value = "" + getNumbersInString(e)
                                return valores[0] = getNumbersInString(e)
                            }
                            if (e.includes("Documento")) {

                                document.getElementById("control").value = "" + getNumbersInString(e)
                                return valores[0] = getNumbersInString(e)
                            }
                            else if (e.includes("No.")) {

                                document.getElementById("control").value = "" + getNumbersInString(e)
                                return valores[0] = getNumbersInString(e)
                            }

                            if (e.includes("CORRESPONSAL")) {

                                document.getElementById("control").value = "" + getNumbersInString(e)
                                return valores[0] = getNumbersInString(e)
                            }
                            if (e.includes("Usd")) {
                                if (parseFloat(e[i + 1]) > 1) document.getElementById("monto").value = "" + respues[i + 1]
                                return valores[1] = respues[i + 1]
                            }
                            if (e.includes("$")) {
                                if (parseFloat(getNumbersInString(e)) > 1) document.getElementById("monto").value = "" + getNumbersInString(e)
                                return valores[1] = getNumbersInString(e.replace("$", " "))
                            }
                            else if (e.includes("VALOR")) {
                                if (parseFloat(getNumbersInString(e)) > 1) document.getElementById("monto").value = "" + getNumbersInString(e)
                                return valores[1] = getNumbersInString(e)
                            }
                            else if (e.includes("Total")) {

                                if (parseFloat(getNumbersInString(e)) > 1) document.getElementById("monto").value = "" + getNumbersInString(e)
                                return valores[1] = getNumbersInString(e)

                            }
                        }).filter(function (value) {
                            return value != undefined;
                        })

                        console.log(respues, nuevo)
                    }
                    ).catch(erro => console.log(erro))
                }
                console.log(decodificado.data);
            }).catch(error => console.log(error));

    } else {
        console.log(input)
    }*/
};

function Pichincha(tipo, arr) {
    switch (tipo) {
        case "Deposito":
            return tipo
        case "Transferencia":
            let Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            let Comprobante = arr.find(g => g.includes("Comprobante")).match(/\d+(\.\d+)?/g)
            console.log(Math.max(...Total).toFixed(2), String(Comprobante))
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
    switch (tipo) {
        case "Deposito":
            let Total1 = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            let Comprobante2 = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                if (String(e.match(/\d+(\.\d+)?/g)).includes(",")) return
                return String(e.match(/\d+(\.\d+)?/g))

            }).filter(f => f != undefined)
            //  let Comprobante2 = arr.find(g => g.includes("No.")).match(/\d+(\.\d+)?/g)
            console.log(Math.max(...Total1).toFixed(2), Comprobante2)

            return tipo
            break;
        case "Transferencia":
            let Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            let Comprobante = arr.find(g => g.includes("No.")).match(/\d+(\.\d+)?/g)
            console.log(Math.max(...Total).toFixed(2), String(Comprobante))

            return tipo
            break
    }
}
function Guayaquil(tipo, arr) {
    switch (tipo) {
        case "Deposito":
            return tipo
        case "Transferencia":
            let Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            let Comprobante = arr.find(g => g.includes("No.")).match(/\d+(\.\d+)?/g)
            console.log(Math.max(...Total).toFixed(2), String(Comprobante))
            return
    }
}