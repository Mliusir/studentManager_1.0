const express = require('express');


var bodyParser = require('body-parser');


const managerRouter = require('./route/managerRouter');


const session = require('express-session');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',

}));

app.use(express.static('static'));


app.use('/manager',managerRouter);

app.listen(8080,()=>{
    console.log('success');
});