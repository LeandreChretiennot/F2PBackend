require("dotenv").config();
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.ATLAS_URL || "";
const client = new MongoClient(connectionString);
let conn;

const dbConn = {
    db: null,
    connectDb: async function()
    {
        try {
            conn = await client.connect();
        } catch(e) {
            console.error(e);
        }
        this.db = conn.db(process.env.DB_NAME);
        console.log("Connection established");
    }
};

module.exports = dbConn;