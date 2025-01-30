const router = require('express').Router();
const userRouter = require('./userRoute');
const dashboardRoute = require('./dashboardRoute');
const categoriesTransactionsRoute = require('./categoriesTransactionsRoute');
const transactionRoute = require('./transactionRoute');

router.use('/auth', userRouter);

router.use('/dashboard', dashboardRoute);

router.use('/trans', categoriesTransactionsRoute);

router.use('/add', transactionRoute);

module.exports = router;