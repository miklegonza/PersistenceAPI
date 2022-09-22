const express = require('express');
const pool = require('./db');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Prueba 
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello world' })
});

// Insertar
app.post('/api', async (req, res) => {
    const user = {
        id: req.body.id,
        name: req.body.name,
        last: req.body.last
    };

    try {
        if (user.id && user.name && user.last) {
            let query = 'INSERT INTO ' + process.env.DB_NAME + '.info (id, nombres, apellidos) VALUES (?, ?, ?);';

            const insertStmt = await pool.query(query, [user.id, user.name, user.last]);

            if (insertStmt)
                res.status(201).json({
                    status: "success",
                    message: "Usuario insertado exitosamente",
                    insert: insertStmt
                });
            else
                res.status(500).json({
                    status: "failure",
                    message: "No se pudo insertar el dato"
                });
        } else {
            throw 'Información incompleta'
        }
    } catch (error) {
        res.status(500).json({
            status: "Failure",
            message: error
        });
    }
});

// Buscar todos
app.get('/api/list', async (req, res) => {
    try {
        let query = 'SELECT * FROM ' + process.env.DB_NAME + '.info;';
        const listQuery = await pool.query(query);

        if(listQuery)
            res.status(200).json({
                status: "success",
                length: listQuery?.length,
                data: listQuery
            });
        else
            res.status(500).json( {
                status: "failed",
                length: -1
            });
    } catch (error) {
        res.status(500).json({
            status: "Failure",
            message: error
        });
    }
});

// Buscar 
app.get('/api/search', async (req, res) => {
    const id = req.query.id;
    try {
        if (id) {
            let query = 'SELECT * FROM ' + process.env.DB_NAME + '.info WHERE id = ?;';
            const findQuery = await pool.query(query, id);

            if(findQuery.length > 0)
                res.status(200).json({
                    status: "success",
                    length: findQuery?.length,
                    data: findQuery
                });
            else
                res.status(500).json( {
                    status: "failed",
                    length: -1,
                    message: "Not found"
                });
        } else {
            throw 'Información incompleta';
        }
    } catch (error) {
        res.status(500).json({
            status: "Failure",
            message: error
        });
    }
});

// Modificar
app.put('/api/:id', async (req, res) => {
    const id = req.params.id;
    const user = {
        name: req.body.name,
        last: req.body.last
    };

    try {
        if (user.name && user.last) {
            let query = 'UPDATE ' + process.env.DB_NAME + '.info SET nombres = ?, apellidos = ? WHERE id = ?;';

            const updateStmt = await pool.query(query, [user.name, user.last, id]);

            if (updateStmt)
                res.status(201).json({
                    status: "success",
                    message: "Usuario modificado exitosamente",
                    insert: updateStmt
                });
            else
                res.status(500).json({
                    status: "failure",
                    message: "No se pudo modificar el dato"
                });
        } else {
            throw 'Información incompleta'
        }
    } catch (error) {
        res.status(500).json({
            status: "Failure",
            message: error
        });
    }
});

// Eliminar
app.delete('/api/:id', async (req, res) => {//204 no content params
    const id = req.params.id;

    try {
        let query = 'DELETE FROM ' + process.env.DB_NAME + '.info WHERE id = ?;';

        const deleteStmt = await pool.query(query, id);

        if (deleteStmt)
            res.status(201).json({
                status: "success",
                message: "Usuario eliminado exitosamente",
                insert: deleteStmt
            });
        else
            res.status(500).json({
                status: "failure",
                message: "No se pudo eliminar"
            });
    } catch (error) {
        res.status(500).json({
            status: "Failure",
            message: error
        });
    }
});

app.listen(PORT, () => console.log('Server on port: ', PORT));


