const { errors, db, handleErrors } = require('./base');

module.exports = function(server) {
    server.get('/categorias', (req, res, next) => {
        const [data, err] = handleErrors(db('categorias'));
        if (err) return next(new errors.InternalServerError(err.message));
        res.send(data);
        return next();
    });

    server.get('/categorias/:idCategoria', (req, res, next) => {
        const idCat = req.params.idCategoria;
        const [data, err] = handleErrors(db('categorias').where('id', idCat).first());
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Categoria não encontrada'));
        res.send(data);
        return next();
    });

    server.post('/categorias', (req, res, next) => {
        const [data, err] = handleErrors(db('categorias').insert(req.body));
        if (err) return next(new errors.InternalServerError(err.message));
        res.send({ id: data[0] });
        return next();
    });

    server.put('/categorias/:idCategoria', (req, res, next) => {
        const idCat = req.params.idCategoria;
        const [data, err] = handleErrors(db('categorias').where('id', idCat).update(req.body));
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Categoria não encontrada'));
        res.send({ message: 'Categoria atualizada' });
        return next();
    });

    server.del('/categorias/:idCategoria', (req, res, next) => {
        const idCat = req.params.idCategoria;
        const [data, err] = handleErrors(db('categorias').where('id', idCat).delete());
        if (err) return next(new errors.InternalServerError(err.message));
        if (!data) return next(new errors.NotFoundError('Categoria não encontrada'));
        res.send({ message: 'Categoria excluída' });
        return next();
    });
};
