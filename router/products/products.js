const express = require("express");
const { Router } = require("express");
const router = Router();
const app = express();

const Container = require("./container.js")
const productos = new Container ("./router/products/products.json")
const productosEnBase = require("./products.json");
const products = productosEnBase;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use("/" , router );

app.use(express.static("public"));

router.get("/", function ( req , res ) {
    res.sendFile("C:/Users/delfb/OneDrive/Escritorio/Programacion Backend/Entregas/DelfinBlaksleyMujica-WebSockets/views/main.html");
})


let arrayLength = products.length > 0 ? true : false;


router.post("/" , ( req , res ) => {
    const obj = req.body;
    productos.save(obj);
    console.log( products );
    res.sendFile("C:/Users/delfb/OneDrive/Escritorio/Programacion Backend/Entregas/DelfinBlaksleyMujica-WebSockets/views/main.html");
})



module.exports = router