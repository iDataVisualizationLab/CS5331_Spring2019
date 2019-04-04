const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
exports.getConnection = function getConnection(onSuccess) {
    MongoClient.connect(mongoUrl, {useNewUrlParser: true}, (error, conn) => {
        if (error) throw error;
        onSuccess(conn);
    });
}
