const { MongoClient, ObjectID } = require("mongodb");

const dbname = "test";
const url = "mongodb://localhost:27017";

const mongoOptions = {useNewUrlParser: true};

const state = {
    db:null
};

const connect = (callback) => {
    if(state.db){
        callback();
    } else {
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if(err){
                callback(err);
            } else {
                state.db = client.db(dbname);
                callback()
            }
        });
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = { getDB, connect, getPrimaryKey };