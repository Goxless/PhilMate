const config = require("config")
const{Pool} = require("pg");

const isProduction = process.env.NODE_ENV === "production"

const connectionString = `postgresql://${config.get('DB_USER')}:${config.get('DB_PASSWORD')}@${config.get('DB_HOST')}:${config.get('DB_PORT')}/${config.get('DB_DATABASE')}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

console.log(connectionString);

module.exports = {pool};