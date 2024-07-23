// server.js
require('dotenv').config();
const restify = require('restify');

const server = restify.createServer({
    name: 'lojinha',
    version: '1.0.0',
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(process.env.PORT, function() {
    console.log("%s executando em %s", server.name, server.url);
});

// Load routes
require('./routes/categorias')(server);
require('./routes/produtos')(server);
require('./routes/clientes')(server);
require('./routes/pedidos')(server);

// Default route
server.get('/', (req, res, next) => {
    res.send("Bem-vindo(a) a API da Lojinha");
    return next();
});
