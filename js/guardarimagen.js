function cargardatos() {
    let respues = JSON.parse(localStorage.getItem("consilta"))
    let nuevo = ['PICHINCHA BANCO PICHINCHA BAN', 'BANCO PICHING BANCO PICHINC', 'PICHINCHA BA✔ CHINCHA BAN', 'BANCO PICHINCH BANCO PICHING', 'PICHIN¡Transferencia enviada! A BAN', 'BANCO PIC Comprobante: 13422729 PICHING', 'PICHINCHA BANCO PICHINCHA BAN', 'Esta transferencia tardará 20 min.', 'en reflejarse en tus movimientos.', 'BANCO PICHINCHA BANCO', 'Monto', 'CHA BANCO', 'Costo de transacción', 'PICHINGH', '$152.00', '$0.36', 'CHA BANCO PI', 'INVAINCHA BANCO PICHINCH $0.04', 'Fecha PICHINCHA BANC15 dic. 2022', 'Cuenta origen', 'Nombre', 'Cueva Gutierrez Darw...', 'Número de cuenta A BANCO2670', 'RANCO PICHINCHA BAN', 'Cuenta destino', 'Nombre', 'Munoz Gutierrez Keyla...', 'Número de cuenta', '******6305', 'Banco CHA BANCoop. Juventud Ecuato....', 'Correo electrónico A BANNo registrado', 'Wilmer', 'ANG PICHINCHA BANCO PICHINC', 'PICHINCHA BANCO PICHINCHA BAN']
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
    let pichinchadepo = ['BANCO PICHINCHA C.A.', 'DEPOSITO', 'CUENTA CORRIENTE', 'Cuente:.: 21XXXXXX95', 'Nombre:.: COMPUTECNICSNET S.A.', 'Documento: 133518', 'Efectivo.: 29.25', 'Total....: 29.25', 'Moneda...: USD', 'Oficina..: FARMACIA AMIGA', 'CNB......: 1204119406001', 'Fecha....: 2022/dic./22 09:42', 'Control..: 14759082', '**GUARDE SU RECIBO**', '*Cuidar la clave es su responsabilidad', 'Client', 'Breykats']
    let pacificodep = ['BANCO DEL PACIFICO S.A.', 'R. U.C. No. 0990005737001', 'OFICINA MATRIZ', 'Direccion: P. Icaza 200 y Pichincha', 'Contribuyente Especial Resolucion', '#6925 del 08 de Agosto de 1995', 'FECHA', 'HORA', 'CAJERO', 'Banco del Pacífico', 'COMPROBANTE DE TRANSACCION', 'SIN TARJETA', '2022-12-20', 'SECUENCIAL', 'TRANSACCION', 'CUENTA', 'NOMBRE', 'CEDULA', 'DEPOSITANTE', 'VALOR', 'VUELTO', ': 18:32', '01000287', '2618', 'DEPOSITO', ': 8069530', ':', 'COMPUTECNISNET S.A. - CO', ': 1308742616', '$22.40', '$7.60', 'GUAYAQUIL CV SHOPPING VIA A DAULE P', 'GRACIAS POR USAR', 'BANCOMATICO 01000287']
    let produbanco = ['** DEPOSITOS PRODUBANCO **', 'FULLCARGA ECUADOR', 'SERVIPAGOS', 'OFICINA: CANAL WEB FULLCARGA', 'AG. PAGO: 00092461', 'CODCLI: 148216', 'FECHA: 22/12/2022 14:38:05', 'Producto: PRODUBANCO', 'Importe: USD 33', 'Ref.local:', '4387283800', 'Ref.proveedor: 4560052364', 'Codigo 4560052364', 'Referencia 4560001471', 'HontoDeposito 33.00', 'Cuenta Deposito 105819400s', 'Nombre Cliente COMPUTECNICHNET S.A.', 'ORIGINAL CLIENTE']
    //console.log(pacifc)
    if (nuevo.some(e => e.includes("PICHINCHA"))) {
        if (nuevo.some(e => e.includes("Transferencia"))) Pichincha("Transferencia", nuevo)
        if (pichinchadepo.some(e=>e.includes("DEPOSITO"))) Pichincha("Deposito",pichinchadepo)
    }
    if (pacifc.some(e => e.includes("Pacifico"))) {
        if (pacifc.some(f => f.includes("Tu Banco Banco Aqui"))) Pacifico("Barrio", pacifc)
        if (pacificodep.some(f => f.includes("BANCOMATICO"))) Pacifico("Bancomatico", pacificodep)
    }
    if (guaya.some(e => e.includes("Guayaquil"))) {
        if (guaya.some(e => e.includes("Transferencia"))) Guayaquil("Transferencia", guaya)
    }
    if (produbanco.some(e => e.includes("PRODUBANCO"))) Produbanco("Deposito", produbanco)

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

    //https://meganet.covagu.com/files/20221228013659.jpeg pacifico
    //https://meganet.covagu.com/files/20221228013816.jpeg produbanco deposito
    
    //https://meganet.covagu.com/files/20221228013610.jpeg picincha deposito
    //https://meganet.covagu.com/files/20221228013859.jpeg guayaquil deposito
    OCRAPI("https://meganet.covagu.com/files/20221228013659.jpeg").then(salida => {
        let respues = salida.responses[0].fullTextAnnotation.text.split("\n")

        let nuevo = respues.filter(function (value) {
            return value != undefined;
        })
        //localStorage.setItem("guayaquil",JSON.stringify(respues))
        console.log(respues)
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
    let Total
    let Comprobante
    switch (tipo) {
        case "Deposito":
             Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            Comprobante = arr.find(g => g.includes("Control..:")).match(/\d+(\.\d+)?/g)
            console.log("Pichincha deposito", Math.max(...Total).toFixed(2), String(Comprobante))
            return tipo
        case "Transferencia":
             Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
             Comprobante = arr.find(g => g.includes("Comprobante")).match(/\d+(\.\d+)?/g)
            console.log("pichincha Transferencia", Math.max(...Total).toFixed(2), String(Comprobante))
            return { Paga: Total, Comprobante: Comprobante }
    }
}
function Produbanco(tipo,arr) {
    let Total
    let Comprobante
    switch (tipo) {
        case "Deposito":
            Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            Comprobante = arr.find(g => g.includes("Codigo")).match(/\d+(\.\d+)?/g)
            console.log("Produbanco Deposito", Math.max(...Total).toFixed(2),String(Comprobante))
            return tipo
            break;
        case "Transferencia":
            return tipo
            break
    }
}
function Pacifico(tipo, arr) {
    let Total
    let Comprobante2
    switch (tipo) {
        case "Barrio":
             Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
             Comprobante2 = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                if (String(e.match(/\d+(\.\d+)?/g)).includes(",")) return
                return String(e.match(/\d+(\.\d+)?/g))

            }).filter(f => f != undefined && f.length == 6)
            //  let Comprobante2 = arr.find(g => g.includes("No.")).match(/\d+(\.\d+)?/g)
            console.log("pacifico Barrio", Math.max(...Total).toFixed(2), Comprobante2[0])
            return tipo
            break; 
        case "Bancomatico":
             Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            Comprobante2 = arr
            console.log("pacifico Bancomatico deposito", Math.max(...Total).toFixed(2), Comprobante2[23])
            break
        case "Deposito":
            break
        case "Transferencia":
             Total = arr.map(e => {
                if (isNaN(parseFloat(e.match(/\d+(\.\d+)?/g)))) return
                if (!String(e.match(/\d+(\.\d+)?/g)).includes(".")) return
                return String(e.match(/\d+(\.\d+)?/g))
            }).filter(f => f != undefined)
            let Comprobante = arr.find(g => g.includes("No.")).match(/\d+(\.\d+)?/g)
            console.log("pacifico Transferencia", Math.max(...Total).toFixed(2), String(Comprobante))

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
            console.log("Guayq transeferencia", Math.max(...Total).toFixed(2), String(Comprobante))
            return
    }
}