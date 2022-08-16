const express = require('express');
const app = express();
const port = 3000;
var randomSentence = require('random-sentence');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/', async (req, res) => {
    let mongodb = await MongoClient.connect(url);
    let counter = 1632;
    var dbo = mongodb.db("abr");
    for (let index = 1632; index < 2000; index++) {
        let recipes = [];
        for (let i = 0; i < 10000; i++) {
            let date = new Date();
            let abn = date.getMilliseconds() + 
                        '' + date.getSeconds() + 
                        '' + date.getMinutes() + 
                        '' + date.getHours() + 
                        '' + date.getDate() + 
                        '' + date.getMonth() + 
                        '' + date.getFullYear() +
                        '' + parseInt(Math.random() * 1000).toString().padStart(4, 0);
            let acn = date.getMilliseconds() +
                '' + date.getSeconds() +
                '' + date.getMinutes() +
                '' + date.getHours() +
                '' + parseInt(Math.random() * 100).toString().padStart(3, 0);
            let abrId = getUUID();
            let entityName = randomSentence({ min: 4, max: 8 });
            let businessName = randomSentence({ min: 5, max: 40 });
            let postCode = parseInt(Math.random() * 1000).toString().padStart(4, 2);
            let tradingName = parseInt(Math.random() * 1000) % 5  == 0 ? randomSentence({ min: 4, max: 8 }) : '';
            let businessCount = parseInt(Math.random() * 10);
            let tradingCount = tradingName ? parseInt(Math.random() * 10) : 0;
            let state = randomSentence({ words: 1 }).toUpperCase();
            state = state.length > 2 ? state.substr(0, 2) : state;
            var myobj = { abrId, abn, acn, entityName, businessName, tradingName, postCode, businessCount, tradingCount, state};
            recipes.push(myobj);
        }    
        await dbo.collection('abrIndex').insertMany(recipes);
        console.log(`data is inserting ${counter++}`);    
    }
    res.send('data is inserted successfully');
})

app.listen(port, () => {
    console.log(`The app listening on port ${port}`)
})

function getUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}