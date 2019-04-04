const dbName = 'nodejsmongodb';
const collectionName = 'students';
const connection = require('./connection');
exports.insertStudent = function(st, onSuccess){
    connection.getConnection((conn)=>{
        const db = conn.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(st, {}, (error, result)=>{
            if(error) throw error;
            onSuccess(result);
            conn.close();//This is to close the connection
        });
    });
}
exports.selectAll = function(onSuccess){
    connection.getConnection((conn)=>{
        const db = conn.db(dbName);
        const collection = db.collection(collectionName);
        collection.find({}, (error, cursor)=>{
            if(error) throw error;
            onSuccess(cursor, ()=>{
                conn.close();//Close the connection
            });
        });
    });
}