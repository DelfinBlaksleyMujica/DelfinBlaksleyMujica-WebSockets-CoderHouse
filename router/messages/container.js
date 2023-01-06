const fs = require("fs").promises;

class Contenedor{
    constructor( path ){
        this.path = path
    }
    async save(objeto){
        try {
            const leer = await fs.readFile( this.path , "utf-8" );
            const data = JSON.parse( leer );
            let id;
            data.length === 0
            ?
            (id = 1)
            :
            (id = data.length + 1);
            const newMessage = {...objeto , id };
            data.push(newMessage);
            await fs.writeFile( this.path , JSON.stringify( data , null , 2 ) , "utf-8");
            console.log("Se agrego el mensaje " + JSON.stringify(objeto.title) + " correctamente");
            return newMessage.id;
        }catch (e){
            console.log(e);
        }
    }

}