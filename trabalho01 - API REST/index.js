var knex = require("knex");
const restify = require("restify");
const errors = require("restify-errors");

const server = restify.createServer({
    name : 'lojinha' ,
    version : '1.0.0'
});

server.use( restify.plugins.acceptParser(server.acceptable) );
server.use( restify.plugins.queryParser() );
server.use( restify.plugins.bodyParser() );

server.listen( 8001 , function() {
    console.log("%s executando em %s", server.name, server.url)
});

knex = require('knex')({
    client : 'mysql' ,
    connection : {
        host : 'localhost' ,
        user : 'root' ,
        password : '' ,
        database : 'lojinha_2024_1'
    }
});

server.get( '/' , (req, res, next) =>{
    res.send("Bem-vindo(a) a API da Lojinha")
} )

server.get('/categorias' , (req, res, next) =>{
    knex('categorias').then( (dados) => {
        res.send( dados )
    }, next)
} )

server.get('/categorias/:idCategoria' , (req, res, next) =>{
    const idCat = req.params.idCategoria
    knex('categorias')
    .where( 'id' , idCat)
    .first()
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Categoria nao encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.post('/categorias' , (req, res, next) =>{
    knex('categorias')
    .insert( req.body )
    .then( (dados) => {
        res.send( dados )
    }, next)
} )

server.put('/categorias/:idCategoria' , (req, res, next) =>{
    const idCat = req.params.idCategoria
    knex('categorias')
    .where( 'id' , idCat)
    .update( req.body )
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Categoria nao encontrado')
            )
        }
        res.send( "Produto Atualizado" )
    }, next)
}
)
server.del('/categorias/:idCategoria' , (req, res, next) =>{
    const idCat = req.params.idCategoria
    knex('categorias')
    .where( 'id' , idCat)
    .delete()
    .then( (dados) => {
        res.send( "Produto Excluido" )
    }, next)
} )

// server.get('/produtos' , (req, res, next) =>{
//     knex('produtos')
//     .join("categorias", "produtos.codCategoria", "=", "categorias.id")
//     .select("produtos.id", "produtos.nome", "produtos.preco", "produtos.quantidade", "categorias.nome AS cat")
//     .then( (dados) => {
//         if (!dados || dados == ""){
//             return res.send(
//                 new errors.BadRequestError('Produto não encontrado')
//             )
//         }
//         res.send( dados )
//     }, next)
// } )

server.get('/produtos' , (req, res, next) =>{
    knex('produto').then( (dados) => {
        res.send( dados )
    }, next)
} )

server.get('/produtos/:idProduto' , (req, res, next) =>{
    const idProd = req.params.idProduto
    knex('produtos')
    .where( 'id' , idProd)
    .first()
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Produto nao encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.post('/produtos' , (req, res, next) =>{
    knex('produtos')
    .insert( req.body )
    .then( (dados) => {
        res.send( dados )
    }, next)
} )

server.put('/produtos/:idProduto' , (req, res, next) =>{
    const idProd = req.params.idProduto
    knex('produtos')
    .where( 'id' , idProd)
    .update( req.body )
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Produto nao encontrado')
            )
        }
        res.send( "Produto Atualizado" )
    }, next)
}
)
server.del('/produtos/:idProduto' , (req, res, next) =>{
    const idProd = req.params.idProduto
    knex('produtos')
    .where( 'id' , idProd)
    .delete()
    .then( (dados) => {
        res.send( "Produto Excluido" )
    }, next)
} )

server.get('/clientes' , (req, res, next) =>{
    knex('clientes')
    .join("cidades", "clientes.cidade_id", "=", "cidades.id")
    .select("clientes.id", "clientes.nome", "clientes.altura", "clientes.nascimento", "cidades.nome AS Cidade")
    .then( (dados) => {
        if (!dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Cliente não encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.get('/clientes/:idCliente' , (req, res, next) =>{
    const idCliente = req.params.idCliente
    knex('clientes')
    .where( 'id' , idCliente)
    .first()
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Cliente nao encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.post('/clientes' , (req, res, next) =>{
    knex('clientes')
    .insert( req.body )
    .then( (dados) => {
        res.send( dados )
    }, next)
} )

server.put('/clientes/:idCliente' , (req, res, next) =>{
    const idCliente = req.params.idCliente
    knex('clientes')
    .where( 'id' , idCliente)
    .update( req.body )
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Cliente nao encontrado')
            )
        }
        res.send( "Cliente Atualizado" )
    }, next)
}
)
server.del('/clientes/:idCliente' , (req, res, next) =>{
    const idCliente = req.params.idCliente
    knex('clientes')
    .where( 'id' , idCliente)
    .delete()
    .then( (dados) => {
        res.send( "Cliente Excluido" )
    }, next)
} )

server.get('/pedidos' , (req, res, next) =>{
    knex('pedidos')
    .join("clientes", "pedidos.cliente_id", "=", "clientes.id")
    .select("pedidos.id", "pedidos.horario", "pedidos.endereco", "clientes.nome AS Cliente")
    .then( (dados) => {
        if (!dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Pedido não encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.get('/pedidos/:idPedidos' , (req, res, next) =>{
    const idPedidos = req.params.idPedidos
    knex('pedidos')
    .where( 'id' , idPedidos)
    .first()
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Pedido nao encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.post('/pedidos' , (req, res, next) =>{
    knex('pedidos')
    .insert( req.body )
    .then( (dados) => {
        res.send( dados )
    }, next)
} )

server.put('/pedidos/:idPedidos' , (req, res, next) =>{
    const idPedidos = req.params.idPedidos
    knex('pedidos')
    .where( 'id' , idPedidos)
    .update( req.body )
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Pedido nao encontrado')
            )
        }
        res.send( "Pedido Atualizado" )
    }, next)
}
)
server.del('/pedidos/:idPedidos' , (req, res, next) =>{
    const idPedidos = req.params.idPedidos
    knex('pedidos')
    .where( 'id' , idPedidos)
    .delete()
    .then( (dados) => {
        res.send( "Pedido Excluido" )
    }, next)
} )

server.get('/pedidos_produtos' , (req, res, next) =>{
    knex('pedidos_produtos')
    .join("pedidos", "pedidos_produtos.pedido_id", "=", "pedidos.id")
    .join("produtos", "pedidos_produtos.produtos_id", "=", "produtos.id")
    .select("pedidos_produtos.pedido_id", "pedidos_produtos.produto_id", "pedidos_produtos.preco", "pedidos_produtos.quantidade")
    .then( (dados) => {
        if (!dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Pedido não encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.get('/pedidos_produtos/:idPedidosProdutos' , (req, res, next) =>{
    const idPedidosProdutos = req.params.idPedidosProdutos
    knex('pedidos_produtos')
    .where( 'id' , idPedidosProdutos)
    .first()
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Pedido nao encontrado')
            )
        }
        res.send( dados )
    }, next)
} )

server.post('/pedidos_produtos' , (req, res, next) =>{
    knex('pedidos_produtos')
    .insert( req.body )
    .then( (dados) => {
        res.send( dados )
    }, next)
} )

server.put('/pedidos_produtos/:idPedidosProdutos' , (req, res, next) =>{
    const idPedidosProdutos = req.params.idPedidosProdutos
    knex('pedidos_produtos')
    .where( 'id' , idPedidosProdutos)
    .update( req.body )
    .then( (dados) => {
        if( !dados || dados == ""){
            return res.send(
                new errors.BadRequestError('Pedido nao encontrado')
            )
        }
        res.send( "Pedido Atualizado" )
    }, next)
}
)
server.del('/pedidos_produtos/:idPedidosProdutos' , (req, res, next) =>{
    const idPedidosProdutos = req.params.idPedidosProdutos
    knex('pedidos_produtos')
    .where( 'id' , idPedidosProdutos)
    .delete()
    .then( (dados) => {
        res.send( "Pedido Excluido" )
    }, next)
} )