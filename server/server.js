const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3010;

app.use(cors());
app.use(bodyParser.json());

const db = require("./db");
const collection = "collection";

app.get('/', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if(err){
            console.log(err);
        } else {
            console.log(documents);
            res.json(documents);
        }
    })
});

app.put('/:id', (req, res) => {
    const { params, body } = req;
    const id = db.getPrimaryKey(params.id);
    db.getDB().collection(collection).findOneAndUpdate(
        { _id: id }, 
        {$set: { first: body.first }}, 
        {returnOriginal: false }, 
        (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.json(result);
            }
        })
})

db.connect((err) => {
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`)
        });
    }
})