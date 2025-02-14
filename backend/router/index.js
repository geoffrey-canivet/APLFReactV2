const router = require('express').Router();
const userRouter = require('./userRoute');
const dashboardRoute = require('./dashboardRoute');
const categoriesTransactionsRoute = require('./categoriesTransactionsRoute');
const transactionRoute = require('./transactionRoute');
const subTransactionRoute = require('./subTransactionRoute');
const periodRoute = require("./periodRoute");
const logHistoryRoute = require("./logHistoryRoute");
const templateRoute = require("./templateRoute");
const commerceRoute = require('./commerceRoute');

router.use('/auth', userRouter);

router.use('/dashboard', dashboardRoute);

router.use('/trans', categoriesTransactionsRoute);

router.use('/add', transactionRoute);

router.use('/subTransaction', subTransactionRoute);

router.use("/period", periodRoute);

router.use("/logHistory", logHistoryRoute)

router.use("/template", templateRoute);

router.use("/commerce", commerceRoute);



module.exports = router;