import axios from "axios"
export default async function validation(dog) {
    const error = {}
    //console.log('mira mamasitaaaa', dog.tempers)
    // dog.tempers?
    // dog.tempers.forEach((temper,i)=>{
    //     if(index!= i){
    //         if(temper.temper === value){
    //             error.tempersRepeat = "Tiene uno o varios temperamentos repetidos";
    //             //setError({...error, tempersRepeat: "Tiene uno o varios temperamentos repetidos"})
    //             return;
    //         }
    //         // temper.temper === value ? selected = true: selected= false;
    //         // setError({...error, tempersRepeat: "Tiene uno o varios temperamentos repetidos"})
    //     }
    // }):null
    const tempersNoBlank = dog.tempers.filter((s)=> s.temper!== "")
    const setTempers = new Set(tempersNoBlank.map((s)=> s.temper))
    console.log('mira papi', tempersNoBlank)
    console.log('mira loro', setTempers)
    console.log('mira mamasitaaaa', setTempers.size !== tempersNoBlank.length)
    if(setTempers.size !== tempersNoBlank.length){
        error.temperaments = "Tiene uno o varios temperamentos repetidos";
    }

    if(tempersNoBlank.length !== dog.tempers.length){
        error.temperaments = "Hay temperamentos que no ha seleccionado"
    }

    if (!/^[a-zA-Z\s]*$/.test(dog.name)) {
        //console.log(dog.name,'jijiji')
        error.name = 'El nombre ingresado debe contener unicamente letras'
    }
    if (dog.name === '') {
        error.name = 'Debe ingresar un nombre'
    }
    

    if (dog.image) {    
        // fetch(dog.image)
        //     .then(response => {
        //         console.log(response)
        //         if (response.status === 200) {
        //             const contentType = response.headers.get("content-type");
        //             console.log(contentType)
        //             if (contentType.includes("image")) {
        //                 console.log("La URL es válida y devuelve una imagen.");

        //             } else {
        //                 console.log("La URL es válida pero no devuelve una imagen.");
        //                 error.image = 'La URL es válida pero no devuelve una imagen'
        //                 // setError({
        //                 //     ...error,
        //                 //     image: 'La URL es válida pero no devuelve una imagen'
        //                 // })
        //             }
        //         } else {
        //             console.log("La URL no devuelve contenido o es inválida.");
        //             // setError({
        //             //     ...error,
        //             //     image: 'La URL no devuelve contenido o es inválida.'
        //             // })
        //             error.image = "La URL no devuelve contenido o es inválida."
        //         }
        //     })
        //     .catch(error => {
        //         console.log("La URL es inválida.");
        //         // setError({
        //         //     ...error,
        //         //     image: 'La URL es inválida.'
        //         // })
        //         error.image = 'La URL es inválida.'
        //     })

            try {
                let response = await axios(dog.image)
                if (response.status === 200) {
                    const contentType = response.headers.get("content-type");
                    console.log(contentType)
                    if (contentType.includes("image")) {
                        console.log("La URL es válida y devuelve una imagen.");

                    } else {
                        console.log("La URL es válida pero no devuelve una imagen.");
                        error.image = 'La URL es válida pero no devuelve una imagen'
                        // setError({
                        //     ...error,
                        //     image: 'La URL es válida pero no devuelve una imagen'
                        // })
                    }
                } else {
                    console.log("La URL no devuelve contenido o es inválida.");
                    // setError({
                    //     ...error,
                    //     image: 'La URL no devuelve contenido o es inválida.'
                    // })
                    error.image = "La URL no devuelve contenido o es inválida."
                }
            } catch (err) {
                error.image = 'La URL es inválida.'
            }


           
    }

    if (dog.image === '') {
        error.image = 'Debe ingresar una url'
    }

    //console.log('Error image', error.image)


    return error;
}