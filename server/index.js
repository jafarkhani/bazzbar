var express = require('express');
var app = express();
var cors = require('cors');

const fs = require('fs');
const importFilePath = "server";
const importFileName = "scores.json";

app.use(cors());
//-----------------------------------------------------------

app.get('/AddScore', function (request, response) {
    try{
        let params = request.query;
        var result = [];

        let scores = fs.readFileSync(importFilePath + "/" + importFileName, 'utf8');
        scores = scores === "" ? [] : JSON.parse(scores);
        
        for(var i=0; i<scores.length; i++){

            if(scores[i].score >= params.score){
                result.push(scores[i]);
                continue;
            }				
            break;				
        }
        if(result.length < 10){
            result.push(params);

            while(result.length < 10 && i < scores.length){
                result.push(scores[i]);
                i++;
            }
        }
        
        fs.writeFileSync(importFilePath + "/" + importFileName, JSON.stringify(result), 'utf8');
        
        return response.sendStatus(200).send();

    }
    catch (err) {
        return response.sendStatus(500).json(err)        
    }
    
});

//-----------------------------------------------------------

app.get('/GetScores', function (request, response) {

    const data = fs.readFileSync(importFilePath + "/" + importFileName, 'utf8');
    return response.status(200).send(data === "" ? [] : data);
});


//-----------------------------------------------------------

app.listen(5000, function () {
    console.log('App running on port 5000');
});