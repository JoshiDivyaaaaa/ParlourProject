const express = require('express');
const mysql = require('mysql2');
const bodyparser =require('body-parser');
const cors = require('cors');
//const bodyParser = require('body-parser');

const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(cors());

app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'Divyajoshi',
    database: 'booking_db'
});

db.connect((err) =>{
    if(err){
        console.error('Error connecting to mysql:',err);
    }
    else{
        console.log('connected to MySQl');
    }
});

app.post('/book-appointment',(req, res)=>{
    const{name, email, phone, date, time, selected_items} =req.body;

    console.log("Received data:", { name, email, phone, date, time, selected_items });

    const query = 'INSERT INTO appointment(name, email, phone, date, time, selected_items) VALUES(?,?,?,?,?,?)';

    db.query(query,[name, email, phone, date, time, selected_items  || ""], (err, result)=>{
        if(err){
            console.error('Error inserting data',err);
            res.status(500).send({message:'Error booking appointment'});
        }
        else{
            console.log('Query executed successfully:', result);
            res.status(200).send({message: 'Appointment booked successfully'});
        }
    });
});

//const PORT =3000;

app.listen(3000, () =>{
    console.log('server is running on http://localhost:3000');
});
