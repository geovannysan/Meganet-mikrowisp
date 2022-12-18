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
        const { data } = await axios.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBNia4WYQBvCuD_LbkihLTw_jj4ke6xmCY",
            body
        )
        return data
    } catch (error) {
        return error
    }
}

let imageUpload = document.getElementById("imageUpload");
let uploadMsg = document.getElementById("uploadMsg");
imageUpload.onchange = function () {
    let input = this.files[0];
    if (input) {       
        let fordata = new FormData();
        fordata.append('fileTest', this.files[0]);
        console.log(fordata)
        axios.post("js/guardar.php", fordata,
        ).then(respuesta => respuesta.json())
            .then(decodificado => {
                if(!decodificado.status) {
                    jSuites.notification({
                        error: 1,
                        name: 'Hubo un error',
                        message: decodificado.result,
                    })
                    console.log(decodificado);
                }
                if (decodificado.status){
                    OCRAPI(decodificado.result).then(salida=>
                        console.log("ocr-->",salida)
                        ).catch(erro=>console.log(erro))
                }
                console.log(decodificado);
            }).catch(error => console.log(error));

    } else {
        console.log(input)
        //s  text = "“Please select as file”";
    }
    //uploadMsg.innerHTML = text;
};