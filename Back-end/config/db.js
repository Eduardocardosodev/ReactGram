const mongoose = require('mongoose');
const dbUser = process.env.MONGODB_USER
const dbPassword = process.env.MONGODB_PASSWORD

const conn = async () => {

    try{
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.b5rulha.mongodb.net/?retryWrites=true&w=majority`)

        console.log('Conectou ao banco!');

        return dbConn
    }catch(error){
        console.log(error);
    }   
}

conn();

module.exports = conn