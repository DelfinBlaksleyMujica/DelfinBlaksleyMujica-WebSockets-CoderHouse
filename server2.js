const express =require("express")
const app = express();
const http = require("http").Server(app);
const io =  require("socket.io")(http);

const products = require("./router/products/products.js");
const hbs = require('hbs');


app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use("/" , products );
//Defino el motor de plantilla 

hbs.registerPartials(__dirname + "/HBS/app/views/partials");
app.set("views" , "./views");// especifica el directorio de vistas
app.set("view engine" , "hbs");// especifica el motor de plantillas
app.use( express.static("public"));// registra el motor de plantillas


const port = 3000;

app.use(express.static("public"));



const messages = [
    
];

/*app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");    
})*/

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