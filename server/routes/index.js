const Router = require('express');
const router = new Router();

// Routers
const userRouter = require('./userRouter')

router.use('/user', userRouter);

module.exports = router;