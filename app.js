require('dotenv').config();
const Express = require('express');
const app = Express();

const database = require('./db');
database.sync();

app.use(Express.json());

app.use(Express.static(__dirname + '/public'));
console.log(__dirname);

const logcontroller = require('./controllers/logcontroller');
app.use('/log', logcontroller);

const usercontroller = require('./controllers/usercontroller');
app.use('/', usercontroller);

app.listen(process.env.PORT, function(){ console.log(`App is listening on port ${process.env.PORT}`) });
