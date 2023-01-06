const express =require("express")
const app = express();
const http = require("http").Server(app);
const io =  require("socket.io")(http);

const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("C:/Users/delfb/OneDrive/Escritorio/Programacion Backend/Entregas/DelfinBlaksleyMujica-WebSockets/app/index.html");    
})

const messages = [
    {
        author: "Juan" , 
        text: "Hola que tal"
    },
    {
        author: "Pedro" ,
        text: "Muy bien y vos"
    },
    {
        author: "Ana" , 
        text: "Genial!!"
    }
];


io.on( "connection" , ( socket ) => {
    console.log("Usuario conectado " + socket.id );
    socket.emit( "messages" , messages );
    /*messages es lo que le manda al front y "messages" es el evento*/
    socket.on("new-message" , (data) => {
        messages.push( data );
        io.sockets.emit("messages" , messages);
    });
});

const server = http.listen( port , ()=> {
    console.log(`Escuchando app en el puerto ${server.address().port}`);
});