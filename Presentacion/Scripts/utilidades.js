class Conexion{
    constructor(url){
        this.url = url;
    }

    async crearConexion(funcion){
        try{
            const response = await fetch(this.url)
            const data= await response.json();
            funcion(data);
        }
        catch(error){
            console.error("Error al realizar la conexión de recibimiento:", error);
        }
    }

    async buscar(dataBuscar, _funcion){
        //tenemos que buscar una data claramente, entonces le tenemos que pasar al servidor la que queremos buscar, como es en php, no requiere gran cosa, primero queremos que data quiere, no?
        try{
            const dn = {
                tipoBusca: "tipo",
                dato: dataBuscar
            };
            const response = await fetch(this.url, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dn)
            })
            const data = await response.json();
            _funcion(data); // lo usamos
            return data;
        }
        catch(error){
            console.log("error: "+error)
        }
    }
    async buscarPorDistribuidor(dataBuscar,_funcion){
        try{
            const dn = {
                tipoBusca: "distribuidor",
                dato: dataBuscar
            };
            const response = await fetch(this.url, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dn)
            })
            const data = await response.json();
           _funcion(data); // lo usamos
            return data;
        }
        catch(error){
            console.log("error: "+error)
        }

    }

}