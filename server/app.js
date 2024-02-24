require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const port = process.env.PORT;
const connectToDB = require('./Database/dbconfig');
const scheduleTask = require('./cron/cron');
app.use(express.json());
// connecting to database
connectToDB();
app.use('/api', require('./routes/cryptoOperations')); // for crypto related operations
// swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app listening
app.listen(port, () => {
    console.log("server listening on port", port);
    scheduleTask.start();
})