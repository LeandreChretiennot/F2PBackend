const dbAccess = require("./dbconn");

const users = {
    readAll: async function() {
        let collection = await dbAccess.db.collection("Users");
        let results = await collection.find({})
          .toArray();
        return results;
    }
}

module.exports = users;