const express = require('express');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const { dbConnection } = require('./database/config');

const app = express();
dbConnection();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/api/student', require('./routes/student'));

app.listen(process.env.PORT, () => {
    console.log(`\nSTARTING SERVER\n✅ http://localhost:${ process.env.PORT }`);
});