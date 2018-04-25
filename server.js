// Krusty Krab Pizza
// Need to npm install --save express, mysql, ejs, and body-parser
const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();
const React = require('react');


// Will look for a file in local directory called "views" and for a file with ".ejs" at the end
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // Use public folder to access css
app.use(bodyParser.urlencoded({extended: true})); // Needed for post requests ie: submitting a form

// Establish connection with database
var connection = mysql.createConnection({
    host: 'sl-us-south-1-portal.20.dblayer.com',
    port: 40397,
    user: 'admin',
    password: 'SFXQRQVBQVYQFGUC',
    database: 'compose'
});

// Check if database is properly connected to
connection.connect(function(error) {
    if(!!error) {
        console.log("Error connecting to database");
    } else {
        console.log("Connected");
    }
});


app.get('/users', function(req, res) {
  var q = "SELECT * FROM Users"
  connection.query(q, function(err, results) {
    console.log(results);
  });
    res.send('Working! Type /login for login page.');
});


// Login Page
app.get('/login', function(req, res) {
    res.render("login");
});

app.post('/logincheck', function(req, res) {
    var email = req.body.email;
    var password = req.body.pass;
    console.log(email);
    console.log(password);
    var q = "SELECT email, password FROM Users WHERE email='" + email + "' && password='" + password + "'";
    connection.query(q, function(err, results) {
        if(err) throw err;
        // console.log(results);
        if(results[0]) {
            console.log("The email and password are correct!");
        } else {
            console.log("The email or password is incorrect. Try again.");
        }
    });
    res.redirect('/login');
});

// Register Page
app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/registercheck', function(req, res) {
    var fName = req.body.fName; // information obtained from body-parser
    var lName = req.body.lName;
    var email = req.body.email;
    var address = req.body.address;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    if(pass1 == pass2) {
        var q = "SELECT email FROM Users WHERE email ='" + email + "'";
        connection.query(q, function(err, results) {
            if(err) throw err;
            if(results[0]) {
                console.log("This email already exists!");
            } else {
                var user = {
                    email: email,
                    password: pass2
                };
                // q = "INSERT INTO Users(email, password) VALUES ('" + email + "', '" + pass2 + "')";
                connection.query("INSERT INTO Users SET ?", user, function(err, results) {
                    if(err) throw err;
                });

                q = "SELECT id FROM Users WHERE email = '" + email + "'";
                connection.query(q, function(err, result) {
                    if(err) throw err;
                    var registerAccount = {
                        userID: result[0]['id'],
                        address: address,
                        f_name: fName,
                        l_name: lName,
                        vip_status: 0,
                        rating: 0.0
                    };
                    // console.log(getUserID(email));
                    connection.query("INSERT INTO RegisteredAccts SET ?", registerAccount, function(err, results) {
                        if(err) throw err;
                        console.log("The User has been successfully registered!");
                    });
                });
            }
        });
    } else {
        console.log("Your passwords do not match!");
    }
    res.redirect('/register');
});

app.get('*', function(req, res) {
    res.send("This is not a valid page on this website.")
});

// Setup port
app.listen(8080, function() {
    console.log("Server running on 8080");
});

function checkExistingEmail(email) {
    var q = "SELECT email FROM Users WHERE email = '" + email + "'";
    connection.query(q, function(err, results) {
        if(err) throw err;
        if(results) {
            return true;
        } else {
            return false;
        }
    });
}

function getUserID(email) {
    var q = "SELECT id FROM Users WHERE email = '" + email + "'";
    connection.query(q, function(err, results) {
        if(err) throw err;
        return (results[0]['id']);
    });
}
