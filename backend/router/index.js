const router = require('express').Router();
const userRouter = require('./userRoute');
const dashboardRoute = require('./dashboardRoute');

router.use('/auth', userRouter);

router.use('/dashboard', dashboardRoute);

module.exports = router;