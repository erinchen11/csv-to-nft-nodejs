require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
// router group
// "/mint"
app.use('/mint',require('./routes/MintRoutes'));
app.use('/resolve',require('./routes/PreviewRoutes'));


console.log("Start storing")


app.listen(8000, function() {

    console.log('App running on port 8000');

});
