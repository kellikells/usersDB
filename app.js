const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});

// starting the server 
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies (as sent by API clients) 
app.use(express.json());
// initialize the cookie parser so we can setup cookies in the browser
app.use(cookieParser());

// telling node.js what view engine to use to show html
app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
        console.log(error)
    } else {
        console.log('mysql connected');
    }
});

// routes 
// -----------------------------
// app.get('/', (req, res) => {
//     // res.send('<h1>Home Page </h1>')
//     res.render('index');
// }); 
// app.get('/register', (req, res) => {
//     res.render('register');
// }); 
// app.get('/login', (req, res) => {
//     res.render('login');
// }); 


// DEFINE ROUTES: 
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// telling express which port you want it to listen 
app.listen(5000, () => {
    console.log('server listening on Port 5000');
});