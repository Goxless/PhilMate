const config = require("config")
const{Pool} = require("pg");

const isProduction = process.env.NODE_ENV === "production"

const connectionString = `postgresql://${config.get('DB_USER')}:${config.get('DB_PASSWORD')}@${config.get('DB_HOST')}:${config.get('DB_PORT')}/${config.get('DB_DATABASE')}`;

const pool = new Pool({connectionString: isProduction ? process.env.DATABASE_URL : connectionString})

// const pool = new Pool({
//     user: config.get('DB_USER'),
//     host: config.get('DB_HOST'),
//     database: config.get('DB_DATABASE'),
//     password: config.get('DB_PASSWORD'),
//     port: "5432"
//     })

console.log(connectionString);


module.exports = {pool};
