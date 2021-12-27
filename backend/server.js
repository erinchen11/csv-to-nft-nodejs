require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.options('*', cors())
app.use(bodyParser.json());
// router group
// "/mint"
app.use('/mint',require('./routes/MintRoutes'));
app.use('/resolve',require('./routes/PreviewRoutes'));
app.get('/health_check',function(req,res){
    res.status(200).json('success')

});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



console.log("Start storing")


app.listen(process.env.SERVER_PORT, function() {

    console.log('App running on port '+ process.env.SERVER_PORT);

});
