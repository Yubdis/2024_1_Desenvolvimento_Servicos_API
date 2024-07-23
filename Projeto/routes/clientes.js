const { errors, db, handleErrors } = require('./base');

module.exports = function(server) {
    server.post('/clientes', (req, res, next) => {
        const [data, err] = handleErrors(db('clientes').insert(req.body));
        if (err) return next(new errors.InternalServerError(err.message));
        res.send({ id: data[0] });
        return next();
    });

    server.get('/clientes/:clienteId/pedidos', (req, res, next) => {
        const clienteId = req.params.clienteId;
        const [data, err] = handleErrors(db('pedidos').where('cliente_id', clienteId));
        if (err) return next(new errors.InternalServerError(err.message));
        res.send(data);
        return next();
    });
};
