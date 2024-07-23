const { errors, db, handleErrors } = require('./base');

module.exports = function(server) {
    server.post('/pedidos', (req, res, next) => {
        const [data, err] = handleErrors(db('pedidos').insert(req.body));
        if (err) return next(new errors.InternalServerError(err.message));
        res.send({ id: data[0] });
        return next();
    });

    server.get('/pedidos', (req, res, next) => {
        const [data, err] = handleErrors(db('pedidos'));
        if (err) return next(new errors.InternalServerError(err.message));
        res.send(data);
        return next();
    });

    server.get('/pedidos/:idPedido', (req, res, next) => {
        const idPedido = req.params.idPedido;
        const [data, err] = handleErrors(db('pedidos').where('id', idPedido).first());
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Pedido não encontrado'));
        res.send(data);
        return next();
    });

    server.put('/pedidos/:idPedido', (req, res, next) => {
        const idPedido = req.params.idPedido;
        const [data, err] = handleErrors(db('pedidos').where('id', idPedido).update(req.body));
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Pedido não encontrado'));
        res.send({ message: 'Pedido atualizado' });
        return next();
    });

    server.del('/pedidos/:idPedido', (req, res, next) => {
        const idPedido = req.params.idPedido;
        const [data, err] = handleErrors(db('pedidos').where('id', idPedido).delete());
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Pedido não encontrado'));
        res.send({ message: 'Pedido excluído' });
        return next();
    });
};
