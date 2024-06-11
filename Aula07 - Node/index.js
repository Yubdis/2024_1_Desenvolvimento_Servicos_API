//console.log("ola mundo")
const { Console } = require('console');
const http = require('http');
const hostname = '127.0.0.1';
const port =  3000;

const server = http.createServer((req, res) =>{
    res.statsCode = 200;
    res.setHeader( 'Content-type' , 'text/plain')
    res.end( "Oi Mundo");
});

server.listen(port, hostname, ()=>{
    console.log(`Servidor sendo executado em http://${hostname}:${port}/`);
} );