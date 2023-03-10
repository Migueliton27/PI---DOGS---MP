const { Router } = require('express');
const dogsMiddleware = require('./dogs')
const temperamentsMiddleware = require('./temperaments')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsMiddleware)
router.use('/temperaments', temperamentsMiddleware)

module.exports = router;
