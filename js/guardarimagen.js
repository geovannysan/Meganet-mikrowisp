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
                        "maxResults":2
                    }
                ]
            }
        ]
    }
    try {
        // const { data } = await axios.post("https://ocr.asprise.com/api/v1/receipt", parms)
        const { data } = await axios.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBNia4WYQBvCuD_LbkihLTw_jj4ke6xmCY",
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
    if(parseFloat(numbers.join(""))>1)  return numbers.join("");
}
let imageUpload = document.getElementById("imageUpload");
imageUpload.onchange = function () {
    var input = this.files[0];
    console.log(this)
    if (input) {
        var fordata = new FormData();
        fordata.append('fileTest', this.files[0]);
        console.log(fordata)
        var valores={
            comprobante:"",
            monto:""
        }
        //https://microtikcd.000webhostapp.com/files/20221218152550.jpeg
        //https://microtikcd.000webhostapp.com/files/transfer.jpeg
        //https://microtikcd.000webhostapp.com/files/pago.jpeg
       /* OCRAPI("https://microtikcd.000webhostapp.com/files/20221222133158.jpeg").then(salida => {
            let respues = salida.responses[0].fullTextAnnotation.text.split("\n")
            let nuevo = respues.map((e, i) => {
                if (e.includes("Comprobante")) {
                     document.getElementById("control").value=""+getNumbersInString(e)
                    
                    return valores[0] = getNumbersInString(e)
                }
                if (e.includes("$")){
                    
                    if ( parseFloat( e.split("$")[1].replace("$",""))>1) document.getElementById("monto").value = "$" + e.split("$")[1]
                    return valores[1]= getNumbersInString(e.replace("$"," "))    
                }
            }).filter(function (value) {
                return value != undefined;
            })

            console.log(respues, nuevo)
            //console.log(salida.responses[0].fullTextAnnotation.text)
        }
        ).catch(erro => console.log(erro))*/
        axios.post("https://microtikcd.000webhostapp.com/js/guardar.php", fordata).then(respuesta => respuesta)
        .then(decodificado => {
            if(!decodificado.data.status) {
                jSuites.notification({
                    error: 1,
                    name: 'Hubo un error',
                    message: decodificado.data.result,
                })
                console.log(decodificado.data);
            }
            if (decodificado.data.status){
                OCRAPI(decodificado.data.result).then(salida=>
                   {
                    console.log(salida)
                      let respues = salida.responses[0].fullTextAnnotation.text.split("\n")
        let nuevo = respues.map((e, i) => {
            if (e.includes("Comprobante")) {
                 document.getElementById("control").value=""+getNumbersInString(e)
                return valores[0] = getNumbersInString(e)
            }
            if (e.includes("$")){
                if ( parseFloat( e.split("$")[1].replace("$",""))>1) document.getElementById("monto").value = "$" + e.split("$")[1]
                return valores[1]= getNumbersInString(e.replace("$"," "))    
            }
        }).filter(function (value) {
            return value != undefined;
        })

        console.log(respues, nuevo)
                   }
                    ).catch(erro=>console.log(erro))
            }
            console.log(decodificado.data);
        }).catch(error => console.log(error));

} else {
    console.log(input)
    //s  text = "“Please select as file”";
}
//uploadMsg.innerHTML = text;
};