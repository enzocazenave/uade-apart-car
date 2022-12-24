const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ DB');
    } catch(error) {
        console.log(error);
        throw new Error('Failed to connect database');
    }
}

module.exports = {
    dbConnection
};