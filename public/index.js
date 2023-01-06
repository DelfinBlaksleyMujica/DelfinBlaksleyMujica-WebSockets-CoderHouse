/*const socket = io();*/


/*Recibo la informacion del servidor en el cliente ylo muestro con un alert*/
//socket.on("mi mensaje" , data => {
    //alert(data);
    /*Luego le envio desde el cliente un mensaje al servidor para confirmarle que el mensaje llego*/
    //socket.emit("notificacion" , "Mensaje recibido en el cliente exitosamente")
//})

const socket = io();


/*Recibo la informacion del servidor en el cliente ylo muestro con un alert*/
socket.on("mi mensaje" , data => {
    alert(data);
    /*Luego le envio desde el cliente un mensaje al servidor para confirmarle que el mensaje llego*/
    socket.emit("notificacion" , "Mensaje recibido en el cliente exitosamente")
})


const render = ( data ) => {
    const html = data.map(( element , index ) => {
        return`
                <div>
                <strong>${element.author}</strong>
                <em>${element.text}</em>
                </div>`;
    });
    document.getElementById("messages").innerHTML = html;
};


function addMessage(e) {
    const mensaje= {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value
    };
    socket.emit("new-message" , mensaje );
    document.getElementById("username").value = "";
    document.getElementById("texto").value = "";
    /*Hacemos un return false para que no se nos recargue la pagina cuando clickeamos el button*/
    return false;
}

socket.on("messages" , (data) => render(data));

