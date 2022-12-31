const socket = io.connect();

const render = ( data ) => {
    const html = data.map(( element , index ) => {
        return`
                <div>
                <strong style="color:blue">${element.username}</strong>
                <em style="color:brown">[${element.date}]:</em>
                <em style="color:green">${element.text}</em>
                </div>`;
    });
    document.getElementById("messages").innerHTML = html;
};


function addMessage(e) {
    const mensaje= {
        username: document.getElementById("username").value,
        date: Date(),
        text: document.getElementById("texto").value
    };
    socket.emit("new-message" , mensaje );
    document.getElementById("username").value = "";
    document.getElementById("texto").value = "";
    /*Hacemos un return false para que no se nos recargue la pagina cuando clickeamos el button*/
    return false;
}

socket.on("messages" , (data) => render(data));



