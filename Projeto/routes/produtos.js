const { errors, db, handleErrors } = require('./base');

module.exports = function(server) {
    server.get('/produtos', (req, res, next) => {
        const [data, err] = handleErrors(
            db('produtos')
                .join('categoria', 'produtos.codCategoria', '=', 'categoria.id')
                .select('produtos.id', 'produtos.nome', 'produtos.preco', 'categoria.nome AS cat')
        );
        if (err) return next(new errors.InternalServerError(err.message));
        res.send(data);
        return next();
    });

    server.get('/produtos/:idProduto', (req, res, next) => {
        const idProd = req.params.idProduto;
        const [data, err] = handleErrors(db('produtos').where('id', idProd).first());
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Produto não encontrado'));
        res.send(data);
        return next();
    });

    server.post('/produtos', (req, res, next) => {
        const [data, err] = handleErrors(db('produtos').insert(req.body));
        if (err) return next(new errors.InternalServerError(err.message));
        res.send({ id: data[0] });
        return next();
    });

    server.put('/produtos/:idProduto', (req, res, next) => {
        const idProd = req.params.idProduto;
        const [data, err] = handleErrors(db('produtos').where('id', idProd).update(req.body));
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Produto não encontrado'));
        res.send({ message: 'Produto atualizado' });
        return next();
    });

    server.del('/produtos/:idProduto', (req, res, next) => {
        const idProd = req.params.idProduto;
        const [data, err] = handleErrors(db('produtos').where('id', idProd).delete());
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Produto não encontrado'));
        res.send({ message: 'Produto excluído' });
        return next();
    });
};
